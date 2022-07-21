import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { CustomersService } from '../../../services/customer.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseIpunt } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomersService
    ){}

    @UseGuards(AuthorizationGuard)
    @Query(() => [Purchase])
    purchases() {
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField(() => Product)
    product(
        @Parent() purchase: Purchase,
    ) {
        return this.productsService.getProductById(purchase.productId)
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(() => Purchase)
    async createPurchase(
        @Args('data') data: CreatePurchaseIpunt,
        @CurrentUser() user: AuthUser
    ) {
        let customer = await this.customersService.getCustomerByAuthUserId(user.sub);

        if(!customer) {
            customer = await this.customersService.createCustomer({authUserId: user.sub});
        }

        return this.purchasesService.createPurchase({
            productId: data.productId,
            customerId: customer.id
        });
    }


}
