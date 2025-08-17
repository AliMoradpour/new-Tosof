import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/blogs', // New dedicated folder for blog images
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(@Body() createBlogDto: any, @UploadedFile() imageFile: Express.Multer.File, @Req() req) {
    if (!imageFile) {
      throw new HttpException('Blog image is required', HttpStatus.BAD_REQUEST);
    }
    return this.blogService.create({
      ...createBlogDto,
      author: { connect: { id: req.user.userId } },
      image: `uploads/blogs/${imageFile.filename}`, // Save the relative path
    });
  }
}