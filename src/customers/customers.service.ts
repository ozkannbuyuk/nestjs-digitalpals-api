import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found!');
    }
    return customer;
  }

  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new this.customerModel(customer);
    return newCustomer.save();
  }

  async update(id: string, customer: Customer): Promise<Customer> {
    const existingCustomer = await this.customerModel
      .findByIdAndUpdate(id, customer, { new: true })
      .exec();
    if (!existingCustomer) {
      throw new NotFoundException('Customer not found!');
    }
    return existingCustomer;
  }

  async delete(id: string): Promise<void> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Customer not found!');
    }
  }
}
