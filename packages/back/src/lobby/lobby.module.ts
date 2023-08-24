import { Module } from '@nestjs/common';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { LobbyRepository } from './lobby.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LobbySchema } from './interfaces/lobby.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lobby', schema: LobbySchema }]),
  ],
  controllers: [LobbyController],
  providers: [LobbyService, LobbyRepository],
})
export class LobbyModule {}
