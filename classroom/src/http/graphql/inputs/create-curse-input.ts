import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCurseInput {
    @Field()
    title: string
}