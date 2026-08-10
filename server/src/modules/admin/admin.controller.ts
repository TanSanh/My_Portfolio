import { Controller, Post, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.adminService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return this.adminService.getProfile(req.user.userId);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() updateData: { email?: string; username?: string }) {
    return this.adminService.updateProfile(req.user.userId, updateData);
  }
}
