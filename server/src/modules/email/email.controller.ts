import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../admin/guards/jwt-auth.guard';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendReply(
      sendEmailDto.to,
      sendEmailDto.subject,
      sendEmailDto.text,
    );
  }
}
