import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { ProductsService } from '../../../services/products.service';
import { CreateProductIpunt } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private productsService: ProductsService
    ){}

    @Query(() => [Product])
    products() {
        return this.productsService.listAllProducts();
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(() => Product)
    createProduct(
        @Args('data')data: CreateProductIpunt
    ) {
        return this.productsService.createProduct(data);
    }
}
