export interface LobbyRepository {
  join(lobbyId: string): Promise<any>;
}
