import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  create(createProductInput: CreateProductInput) {
    const product = new this.productModel(createProductInput);
    return product.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return this.productModel.updateOne({ _id: id }, updateProductInput).exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  findAllBySeller(sellerId: string) {
    return this.productModel.find({ sellerId }).exec();
  }
}
