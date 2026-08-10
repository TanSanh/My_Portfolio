import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedString {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  vi: string;
}

export class CreateProjectDto {
  @ValidateNested()
  @Type(() => LocalizedString)
  @IsNotEmpty()
  title: LocalizedString;

  @ValidateNested()
  @Type(() => LocalizedString)
  @IsNotEmpty()
  description: LocalizedString;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  github?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}
