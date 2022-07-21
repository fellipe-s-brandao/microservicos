import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePurchaseIpunt {
    @Field()
    productId: string
}