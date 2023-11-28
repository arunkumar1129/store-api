import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './file-utils';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'default', maxCount: 1 },
    { name: 'optional', maxCount: 4 },
  ], multerOptions))
  uploadFile(@UploadedFiles() files: { default?: Express.Multer.File[], optional?: Array<Express.Multer.File> }) {
    return files;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads', id));
    return file.pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.filesService.remove(+id);
  }
}
