import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePublicationDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  prix?: number;

  @IsNotEmpty()
  @IsNumber()
  prixPromo: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
