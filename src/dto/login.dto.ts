export interface loginRequestDto {
  email: string;
  password: string;
}

export interface loginResponseDto {
  message: string;
  token?: string;
}
