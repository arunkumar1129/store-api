import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getFilePath, multerOptions } from './file-utils';
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
    const defaultImage = getFilePath(files.default[0].filename);
    const optionalImages = files.optional?.map(file => getFilePath(file.filename)) || [];
    return {
      default: defaultImage,
      optional: optionalImages,
    };
  }

  @Get(':filename')
  findOne(@Param('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads', filename));
    return file.pipe(res);
  }

  @Delete(':filename')
  remove(@Param('filename') filename: string) {
    //return this.filesService.remove(filename);
  }
}
