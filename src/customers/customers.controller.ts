import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.schema';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    return this.customersService.create(customer);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() customer: Customer,
  ): Promise<Customer> {
    return this.customersService.update(id, customer);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.customersService.delete(id);
  }
}
