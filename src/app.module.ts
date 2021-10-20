import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [ControllerModule, MulterModule.register({
    dest: './files',
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
