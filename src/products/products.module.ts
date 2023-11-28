import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), forwardRef(() => UsersModule)],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
