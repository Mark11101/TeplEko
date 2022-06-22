export interface UserState {
  token: string,
  refreshToken: string,
}

export interface SetTokenActionType {
  token: string,
}

export interface SetRefreshTokenActionType {
  refreshToken: string,
}
