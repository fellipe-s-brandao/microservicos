import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductIpunt {
    @Field()
    title: string
}