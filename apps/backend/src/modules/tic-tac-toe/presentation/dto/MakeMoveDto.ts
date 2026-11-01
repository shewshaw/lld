import {
  IsInt,
  Max,
  Min,
} from "class-validator";

export class MakeMoveDto {
  @IsInt()
  @Min(0)
  @Max(2)
  row: number;

  @IsInt()
  @Min(0)
  @Max(2)
  col: number;
}