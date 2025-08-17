// src/courses/courses.controller.ts
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

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses', // New dedicated folder for course images
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(
            null,
            `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`,
          );
        },
      }),
    }),
  )
  async create(
    @Body() createCourseDto: any,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (!imageFile) {
      throw new HttpException(
        'Course image is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const course = await this.coursesService.create({
      ...createCourseDto,
      image: `uploads/courses/${imageFile.filename}`, // Save the relative path to the database
    });
    return course;
  }
}
