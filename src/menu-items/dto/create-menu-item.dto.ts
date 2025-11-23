import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  image?: string;
}
