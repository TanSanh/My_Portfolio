import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './admin.schema';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { username, password, email } = registerDto;

    // Check if admin already exists
    const existingAdmin = await this.adminModel.findOne({ username });
    if (existingAdmin) {
      throw new ConflictException('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new this.adminModel({
      username,
      password: hashedPassword,
      email,
    });
    await admin.save();

    // Generate JWT
    const payload = { sub: admin._id, username: admin.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;

    // Find admin by username
    const admin = await this.adminModel.findOne({ username });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = { sub: admin._id, username: admin.username };
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
    updateData: Partial<{ email: string; username: string }>,
  ) {
    const admin = await this.adminModel
      .findByIdAndUpdate(adminId, updateData, { new: true })
      .select('-password');
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin;
  }
}
