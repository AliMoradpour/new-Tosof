// src/tools/tools.controller.ts
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
import { ToolsService } from './tools.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createToolDto: any) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateToolDto: any) {
    return this.toolsService.update(id, updateToolDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}