// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}