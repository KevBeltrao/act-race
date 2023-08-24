import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LobbyService } from './lobby.service';
import { Lobby } from './interfaces/lobby.interface';

@ApiTags('lobbies')
@Controller('lobby')
export class LobbyController {
  constructor(private lobbyService: LobbyService) {}

  @Get()
  @ApiOperation({ summary: 'List lobbies' })
  @ApiCreatedResponse({ description: 'Lobbies listed', type: Lobby })
  public async ListLobbies(): Promise<Lobby[]> {
    return await this.lobbyService.ListLobbies();
  }

  @Post()
  @ApiOperation({ summary: 'Create lobby' })
  @ApiCreatedResponse({ description: 'Lobby created', type: Lobby })
  public async createLobby(): Promise<Lobby> {
    return await this.lobbyService.createLobby();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get lobby by code' })
  @ApiOkResponse({ description: 'Lobby detailed', type: Lobby })
  public async detailLobby(@Param('code') code: string): Promise<Lobby> {
    return await this.lobbyService.detailLobby(code);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Delete lobby by code' })
  @ApiOkResponse({ description: 'Lobby deleted', type: Lobby })
  public async deleteLobby(@Param('code') code: string): Promise<Lobby> {
    return await this.lobbyService.deleteLobbyByCode(code);
  }
}
