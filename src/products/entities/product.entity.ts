import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class Product {
  @Field()
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ type: [String], required: true })
  @Field(() => [String])
  images: string[];

  @Prop()
  @Field(() => Int)
  price: number;

  @Prop({ required: true })
  @Field(() => Int)
  originalPrice: number;

  @Prop()
  @Field(() => Float)
  discount: number;

  @Prop({ required: true, type: mongooseSchema.Types.ObjectId })
  @Field()
  sellerId: string;

  @Prop({ type: User, ref: 'User' })
  @Field(() => User, { nullable: true })
  seller: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
