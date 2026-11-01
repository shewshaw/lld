import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  playerXName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  playerOName: string;
}