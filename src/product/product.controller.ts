import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JWTAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { Request } from 'express';
import PermissionGuard from 'src/auth/guard/permission.guard';
import Permission from 'src/enum/permission.enum';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(PermissionGuard(Permission.write))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(PermissionGuard(Permission.Read))
  findAll(@Req() request: Request) {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionGuard(Permission.Read))
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Permission.write))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Permission.Delete))
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
