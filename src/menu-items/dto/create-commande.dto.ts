import { IsString, IsInt, IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class CreateCommandeDto {
  @IsInt()
  @IsNotEmpty()
  table_number: number;

  @IsString()
  @IsNotEmpty()
  order_number: string;
  @IsString()
  @IsNotEmpty()
  total_amount: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  items: string;

 @IsDate()
 @IsOptional()
 created_at?: Date;
}
