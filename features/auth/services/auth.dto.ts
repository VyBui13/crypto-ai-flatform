export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
};

export type RegisterRequestDto = {
  email: string;
  password: string;
};
