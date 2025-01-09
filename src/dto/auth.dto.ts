export interface authRequestDto {
  name?: string;
  email: string;
  password: string;
}

export interface authResponseDto {
  message: string;
  token?: string;
}
