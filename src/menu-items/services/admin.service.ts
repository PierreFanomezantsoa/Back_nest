import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './../entities/Admin.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from './../dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const item = await this.adminRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Admin not found');
    return item;
  }

  create(dto: CreateAdminDto) {
    const item = this.adminRepo.create(dto);
    return this.adminRepo.save(item);
  }

  async update(id: number, dto: UpdateAdminDto) {
    await this.findOne(id);
    await this.adminRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.adminRepo.remove(item);
  }
}
