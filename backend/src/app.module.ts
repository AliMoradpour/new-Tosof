// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { BlogModule } from './blog/blog.module';
import { CategoriesModule } from './categories/categories.module';
import { UploadsModule } from './uploads/uploads.module';

// NEW: ServeStaticModule
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    BlogModule,
    CategoriesModule,
    UploadsModule,
    ProductsModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}