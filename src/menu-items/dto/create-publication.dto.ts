import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  prix?: number;

  @IsNumber()
  prixPromo: number;

  @IsOptional() // 👈 image sera fournie par Multer
  @IsString()
  image?: string;
}
