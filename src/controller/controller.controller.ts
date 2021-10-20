import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Bind } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateControllerDto, UploadControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('controller')
export class ControllerController {
  constructor(private readonly controllerService: ControllerService,
      ) {}

  @Post()
  create(@Body() createControllerDto: CreateControllerDto) {
    return this.controllerService.create(createControllerDto);
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
    })
  })
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
    	originalname: file.originalname,
    	filename: file.fieldname,
    };

    console.log(response);
    return this.controllerService.create(file.filename);
    return file.filename;
  }

  @Get()
  findAll() {
    return this.controllerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controllerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControllerDto: UpdateControllerDto) {
    return this.controllerService.update(+id, updateControllerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controllerService.remove(+id);
  }
}

