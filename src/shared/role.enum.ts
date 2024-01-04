import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    BUYER = "BUYER",
}

registerEnumType(Role, {
    name: 'Role',
});