import { Injectable, NotFoundException } from '@nestjs/common';
import generateRandomDigits from 'src/utils/generateRandomDigits';
import { LobbyRepository } from './lobby.repository';
import { Lobby } from './interfaces/lobby.interface';

@Injectable()
export class LobbyService {
  constructor(private lobbyRepository: LobbyRepository) {}

  async ListLobbies(): Promise<Lobby[]> {
    const lobbies = await this.lobbyRepository.listLobbies();
    return lobbies;
  }

  async createLobby(): Promise<Lobby> {
    const newCode = generateRandomDigits();

    const existingLobby = await this.lobbyRepository.getLobbyByCode(newCode);

    if (existingLobby) {
      return this.createLobby();
    }

    const newLobby = await this.lobbyRepository.createLobby(newCode);
    return newLobby;
  }

  async detailLobby(code: string): Promise<Lobby> {
    const lobby = await this.lobbyRepository.getLobbyByCode(code);
    if (!lobby) throw new NotFoundException('Lobby not found');
    return lobby;
  }

  async deleteLobbyByCode(code: string): Promise<Lobby> {
    const lobby = await this.lobbyRepository.getLobbyByCode(code);
    if (!lobby) throw new NotFoundException('Lobby not found');

    await this.lobbyRepository.removeLobbyById(lobby._id);

    return lobby;
  }
}
