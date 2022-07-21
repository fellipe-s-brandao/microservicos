import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

import slugfy from 'slugify';

interface CreateProductParams {
    title: string;
}

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService
    ) {}

    listAllProducts() {
        return this.prisma.product.findMany();
    }

    getProductById(id: string) {
        return this.prisma.product.findUnique({
            where: {
                id
            }
        })
    }

    async createProduct({ title }: CreateProductParams) {
        const slug = slugfy(title, { lower: true });

        const producWithSameSlug = await this.prisma.product.findUnique({
            where: {
                slug
            }
        })

        if(producWithSameSlug) {
            throw new Error('Another prodcut with same slug already exists.');
        }

        return this.prisma.product.create({
            data: {
                title,
                slug
            }
        })
    }
}