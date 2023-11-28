import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, _id: false })
@ObjectType()
export class Name {
  @Prop({ required: true })
  @Field()
  first: string;

  @Prop({ required: true })
  @Field()
  last: string;
}

@Schema({ versionKey: false, _id: false })
@ObjectType()
export class Contact {
  @Prop()
  @Field()
  email: string;

  @Prop({ type: Array<Address>, default: [] })
  @Field(() => [Address], { defaultValue: [] })
  addresses: Address[];
}

@Schema({ versionKey: false })
@ObjectType()
export class Address {
  @Prop({ required: true, unique: true })
  @Field()
  label: string;

  @Prop({ required: true })
  @Field()
  addresLine1: string;

  @Prop()
  @Field()
  street: string;

  @Prop({ required: true })
  @Field()
  city: string;

  @Prop({ required: true })
  @Field()
  state: string;

  @Prop({ required: true })
  @Field()
  country: string;

  @Prop({ required: true })
  @Field()
  zip: string;
}

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class User {
  @Field()
  _id: string;

  @Prop({ type: Name, required: true, nested: true })
  @Field(() => Name)
  name: Name

  @Prop({ required: true, unique: true })
  @Field()
  mobile: string;

  @Prop({ type: Contact })
  @Field(() => Contact)
  contact: Contact

  @Prop({ required: true })
  @Field()
  role: string;

  @Prop({ type: Array<Product>, default: [] })
  @Field(() => [Product], { defaultValue: [], nullable: true })
  products: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
