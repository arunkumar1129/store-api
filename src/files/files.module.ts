import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './file-utils';

@Module({
  imports: [
    MulterModule.register(multerConfig)
  ],
  controllers: [FilesController],
})
export class FilesModule { }
