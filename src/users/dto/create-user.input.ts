import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsAlpha, IsArray, IsEmail, IsMobilePhone, IsNotEmpty, IsNumberString, IsObject, IsOptional, IsPostalCode, ValidateNested } from 'class-validator';

@InputType('name')
export class Name {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  first: string;

  @IsAlpha()
  @IsNotEmpty()
  @Field()
  last: string;
}

@InputType('contact')
export class Contact {
  @IsOptional()
  @IsEmail()
  @Field()
  email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  @Field(() => [Address], { defaultValue: [] })
  addresses: Address[];
}

@InputType('address')
export class Address {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  label: string;

  @IsNotEmpty()
  @Field()
  addresLine1: string;

  @IsNotEmpty()
  @Field()
  street: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  city: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  state: string;

  @IsNumberString()
  @IsNotEmpty()
  @Field()
  @IsPostalCode('IN')
  zip: string;
}

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Name)
  @Field(() => Name)
  name: Name

  @IsNotEmpty()
  @IsMobilePhone('en-IN')
  @Field()
  mobile: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Contact)
  @Field(() => Contact, { nullable: true })
  contact: Contact

  @IsNotEmpty()
  @Field()
  role: string;
}
