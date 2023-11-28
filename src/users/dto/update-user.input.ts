import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @IsNotEmpty()
    @IsMongoId()
    @Field()
    _id: string;
}
