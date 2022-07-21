import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { kafkaService } from "../messaging/kafka.service";

interface CreatePurchaseParams {
    customerId: string;
    productId: string;
}

@Injectable()
export class PurchasesService {
    constructor(
        private prisma: PrismaService,
        private kafka: kafkaService
    ) {}

    listAllPurchases() {
        return this.prisma.purchase.findMany({
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    listAllFromCustomer(customerId: string) {
        return this.prisma.purchase.findMany({
            where: {
                customerId
            },
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    async createPurchase({ customerId, productId }: CreatePurchaseParams) {
        const prodcut = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if(!prodcut) {
            throw new Error('Product not found.');
        }

        const purchase = await this.prisma.purchase.create({
            data: {
                productId,
                customerId
            }
        });

        const customer = await this.prisma.customer.findUnique({
            where: {
                id: customerId
            }
        })

        this.kafka.emit('purchases.new-purchase', {
            customer: {
                authUserId: customer.authUserId
            },
            prodcut: {
                id: prodcut.id,
                title: prodcut.title,
                slug: prodcut.slug
            }
        })

        return purchase;
    }

}