import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

@InputType('images')
export class Images {
  @IsNotEmpty()
  @Field()
  default: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  optional: string[];
}

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsOptional()
  @IsObject()
  @Field(() => Images)
  images: Images;

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
