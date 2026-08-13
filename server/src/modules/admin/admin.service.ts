import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './admin.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  // NO REGISTER METHOD - Admin accounts created via seed script only

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // Find admin by email
    const admin = await this.adminModel.findOne({ email: email.toLowerCase() });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT with email in payload
    const payload = { sub: admin._id, email: admin.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(adminId: string) {
    const admin = await this.adminModel.findById(adminId).select('-password');
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin;
  }

  async updateProfile(
    adminId: string,
    updateData: Partial<{ email: string; name: string }>,
  ) {
    // If updating email, check if it's already taken
    if (updateData.email) {
      const existingAdmin = await this.adminModel.findOne({
        email: updateData.email.toLowerCase(),
        _id: { $ne: adminId },
      });
      if (existingAdmin) {
        throw new ConflictException('Email already in use');
      }
      updateData.email = updateData.email.toLowerCase();
    }

    const admin = await this.adminModel
      .findByIdAndUpdate(adminId, updateData, { new: true })
      .select('-password');
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin;
  }

  async changePassword(
    adminId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      throw new BadRequestException(
        'New password must contain at least one uppercase letter, one lowercase letter, and one number',
      );
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.adminModel.findByIdAndUpdate(adminId, { password: hashedPassword });

    return { message: 'Password updated successfully' };
  }
}
