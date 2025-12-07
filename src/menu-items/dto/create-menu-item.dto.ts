import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  categorie: string;

  @IsInt()
  price: number;
  
  @IsOptional()
  @IsString()
  image?: string;
}
