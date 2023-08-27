import { Module } from '@nestjs/common';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { LobbyRepository } from './lobby.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LobbySchema } from './interfaces/lobby.schema';
import { LobbyGateway } from './gateways/lobby.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lobby', schema: LobbySchema }]),
  ],
  controllers: [LobbyController],
  providers: [LobbyService, LobbyRepository, LobbyGateway],
})
export class LobbyModule {}
