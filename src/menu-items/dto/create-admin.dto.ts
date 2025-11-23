// create-admin.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString() nom: string;
  @IsString() telephone: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() adresse: string;
}

// login-admin.dto.ts

export class LoginAdminDto {
  @IsEmail() email: string;
  @IsString() password: string;
}
