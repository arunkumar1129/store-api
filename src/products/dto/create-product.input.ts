import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String])
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  originalPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Field(() => Float, { nullable: true })
  discount?: number;

  @IsMongoId()
  @IsNotEmpty()
  @Field()
  sellerId: string;
}
