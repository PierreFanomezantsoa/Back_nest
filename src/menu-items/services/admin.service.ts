import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../entities/Admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private repo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    const admin = this.repo.create({
      ...data,
      password: hashed,
    });

    return this.repo.save(admin);
  }

  async login(email: string, password: string) {
    const admin = await this.repo.findOne({ where: { email } });

    if (!admin) throw new UnauthorizedException('Email incorrect');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Mot de passe incorrect');

    const token = await this.jwtService.signAsync({ id: admin.id, email });

    return { token, admin };
  }
}
