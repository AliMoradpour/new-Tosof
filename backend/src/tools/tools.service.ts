// src/tools/tools.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.tool.create({ data });
  }

  async findAll() {
    return this.prisma.prisma.tool.findMany();
  }

  async findOne(id: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return tool;
  }

  async update(id: string, data: any) {
    return this.prisma.tool.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.tool.delete({ where: { id } });
  }
}