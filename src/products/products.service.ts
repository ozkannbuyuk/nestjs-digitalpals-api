import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Get All Products
  async findAll(): Promise<Product[]> {
    let products = await this.productModel.find().exec();

    const favoriteProducts = products.filter((product) => product.isFavorite);

    const otherProducts = products.filter((product) => !product.isFavorite);

    return [...favoriteProducts, ...otherProducts];
  }

  // Get One Product
  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  // Create Product
  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  // Update Product
  async update(id: string, product: Product): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  // Delete Product
  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  // Add Product to Favorites
  async addToFavorites(id: string): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, { $set: { isFavorite: true } }, { new: true })
      .exec();
  }
}
