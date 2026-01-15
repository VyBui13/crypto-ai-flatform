export type LoginRequestDto = {
  username: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
};

export type RegisterRequestDto = {
  email: string;
  password: string;
  username: string;
  fullname: string;
};
