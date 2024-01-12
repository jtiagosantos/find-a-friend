import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Module({
  exports: [HashingService],
  providers: [HashingService],
})
export class HashingModule {}
