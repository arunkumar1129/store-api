import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsNotEmpty()
  @IsMongoId()
  @Field()
  _id: string;
}
