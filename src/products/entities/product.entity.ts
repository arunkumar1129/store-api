import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: false, versionKey: false, _id: false })
@ObjectType()
export class Images {
  @Prop({ required: true })
  @Field(() => String)
  default: string;

  @Prop({ required: true, type: [String] })
  @Field(() => [String], { nullable: true })
  optional: string[];
}

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

  @Prop({ type: Images, required: true })
  @Field(() => Images)
  images: Images;

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
