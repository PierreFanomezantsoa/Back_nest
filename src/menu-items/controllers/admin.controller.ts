import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post('register')
  register(@Body() body) {
    return this.service.register(body);
  }

  @Post('login')
  login(@Body() body) {
    return this.service.login(body.email, body.password);
  }
}
