export interface SignUpRequestData {
  login: string;
  password: string;
}

export interface SignUpResponseData {
  token: string,
  refreshToken: string,
}

export interface SignInRequestData {
  login: string;
  password: string;
}

export interface SignInResponseData {
  token: string,
  refreshToken: string,
}
