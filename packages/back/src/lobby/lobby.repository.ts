import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lobby } from './interfaces/lobby.interface';

@Injectable()
export class LobbyRepository {
  constructor(
    @InjectModel('Lobby') private readonly lobbyModel: Model<Lobby>,
  ) {}

  async listLobbies(): Promise<Lobby[]> {
    try {
      const lobbies = await this.lobbyModel.find();
      return lobbies;
    } catch (error) {
      throw new BadRequestException('Something went wrong', { cause: error });
    }
  }

  async createLobby(newCode: string): Promise<Lobby> {
    try {
      const newLobby = new this.lobbyModel({ code: newCode });
      await newLobby.save();
      return newLobby;
    } catch (error) {
      throw new BadRequestException('Something went wrong', { cause: error });
    }
  }

  async getLobbyByCode(code: string): Promise<Lobby> {
    try {
      const lobby = await this.lobbyModel.findOne({ code });
      return lobby;
    } catch (error) {
      throw new BadRequestException('Something went wrong', { cause: error });
    }
  }

  async removeLobbyById(id: string): Promise<Lobby> {
    try {
      const lobby = await this.lobbyModel.findByIdAndDelete(id);
      return lobby;
    } catch (error) {
      throw new BadRequestException('Something went wrong', { cause: error });
    }
  }
}
