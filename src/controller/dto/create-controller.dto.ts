import { Body, Get, Post, Patch, Param, Delete, UploadedFile, UseInterceptors  } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ControllerService } from '../controller.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { Express } from 'express';

export class CreateControllerDto {
    @ApiProperty({
        example: 'My File',
        description: 'The breed of the Cat',
      })
    csv: string;
}

export class UploadControllerDto {
  @ApiProperty()
  csv: Express.Multer.File;
}