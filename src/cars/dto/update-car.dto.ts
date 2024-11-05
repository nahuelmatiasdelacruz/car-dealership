import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCarDto{

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsOptional()
  @IsString({message: 'The brand must be a cool string'})
  readonly brand?: string;

  @IsOptional()
  @IsString()
  readonly model?: string;

}