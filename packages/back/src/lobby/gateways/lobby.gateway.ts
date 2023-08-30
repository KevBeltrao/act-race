import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { LobbyRepository } from '../lobby.repository';
import { Lobby } from '../interfaces/lobby.interface';

const TEN_SECONDS = 10 * 1000;

@WebSocketGateway(3001, {
  cors: {
    credentials: true,
    methods: ['GET', 'POST'],
    origin: [process.env.CLIENT_URL],
  },
})
export class LobbyGateway {
  constructor(private readonly lobbyRepository: LobbyRepository) {}
  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket): Promise<void> {
    const lobby = await this.lobbyRepository.findLobbyByUserId(client.id);
    if (!lobby) return;

    const updatedLobby = await this.lobbyRepository.removeUserFromLobby(
      lobby.code,
      client.id,
    );

    client.leave(lobby.code);

    this.server.in(lobby.code).emit('join', {
      status: 200,
      message: 'Joined',
      data: updatedLobby,
    });
  }

  @SubscribeMessage('updatePosition')
  async handleUpdatePosition(
    client: Socket,
    payload: {
      lobby: Lobby;
      position: number;
      videoSrc: string;
    },
  ): Promise<void> {
    this.server.in(payload.lobby.code).emit('updatePosition', {
      userId: client.id,
      position: payload.position,
      videoSrc: payload.videoSrc,
    });
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket, payload: { lobby: Lobby }): void {
    this.server.in(payload.lobby.code).emit('startGame');

    setInterval(() => {
      const emotions = [
        'neutral',
        'happy',
        'sad',
        'angry',
        'fearful',
        'disgusted',
        'surprised',
      ] as const;

      const randomEmotion = emotions[
        Math.floor(Math.random() * emotions.length)
      ] as (typeof emotions)[number];

      this.server
        .in(payload.lobby.code)
        .emit('updateEmotion', { emotion: randomEmotion });
    }, TEN_SECONDS);
  }

  @SubscribeMessage('join')
  async handleMessage(
    client: Socket,
    payload: {
      lobby: Lobby;
      name: string;
    },
  ): Promise<void> {
    const lobby = await this.lobbyRepository.getLobbyByCode(payload.lobby.code);

    if (!lobby) {
      client.emit('join', {
        status: 404,
        message: 'Lobby not found',
      });
      return;
    }

    if (lobby.users.length === 5) {
      client.emit('join', {
        status: 400,
        message: 'Lobby is full',
      });
      return;
    }

    const updatedLobby = await this.lobbyRepository.addUserToLobby(
      lobby.code,
      client.id,
      payload.name,
    );

    client.join(lobby.code);

    this.server.in(lobby.code).emit('join', {
      status: 200,
      message: 'Joined',
      data: updatedLobby,
    });
  }
}
