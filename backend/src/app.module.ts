import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { BlogModule } from './blog/blog.module';
import { CategoriesService } from './categories/categories.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    BlogModule,
    CategoriesModule,
    PrismaModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}