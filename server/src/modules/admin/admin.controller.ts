import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  newPassword: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // NO REGISTER ENDPOINT - Admin accounts created via seed script only

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
  updateProfile(
    @Req() req: any,
    @Body() updateData: { email?: string; name?: string },
  ) {
    return this.adminService.updateProfile(req.user.userId, updateData);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(
    @Req() req: any,
    @Body(new ValidationPipe({ whitelist: true })) changePasswordDto: ChangePasswordDto,
  ) {
    return this.adminService.changePassword(
      req.user.userId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }
}
