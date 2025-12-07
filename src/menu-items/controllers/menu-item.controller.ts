import {
  Controller, Get, Post, Patch, Delete, Param, Body,
  UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuItemService } from '../services/menu-item.service';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';
import { UpdateMenuItemDto } from '../dto/update-menu-item.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

const BACKEND_URL = 'http://192.168.137.118:3000'; 

@Controller('menus')
export class MenuItemController {
  constructor(private readonly service: MenuItemService) {}

  @Get()
  async findAll() {
    const items = await this.service.findAll();
    return items.map(item => ({
      ...item,
      image: item.image ? `${BACKEND_URL}/uploads/menus/${item.image}` : null
    }));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menus',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateMenuItemDto,
    @UploadedFile() file: any
  ) {
    console.log('BODY:', dto);
    console.log('FILE UPLOADED:', file);

    if (file) dto.image = file.filename;
    const newItem = await this.service.create(dto);

    console.log('NEW ITEM CREATED:', newItem);
    return newItem;
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menus',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuItemDto,
    @UploadedFile() file: any
  ) {
    console.log('UPDATE BODY:', dto);
    console.log('FILE UPLOADED FOR UPDATE:', file);

    if (file) dto.image = file.filename;
    const updatedItem = await this.service.update(+id, dto);

    console.log('UPDATED ITEM:', updatedItem);
    return updatedItem;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
