import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createCourseDto: any,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (!imageFile) {
      throw new HttpException('Course image is required', HttpStatus.BAD_REQUEST);
    }
    const course = await this.coursesService.create({
      ...createCourseDto,
      image: `uploads/courses/${imageFile.filename}`,
    });
    return course;
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: any,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (imageFile) {
      updateCourseDto.image = `uploads/courses/${imageFile.filename}`;
    }
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}