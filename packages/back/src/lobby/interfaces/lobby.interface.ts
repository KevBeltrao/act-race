import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Lobby extends Document {
  @ApiProperty({ type: Number, description: 'Unique code' })
  code: string;
}
