export type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type EmailValues = {
  email: string;
};

export type CodeValues = {
  code: string;
};

export type ResetPasswordValues = {
  newPassword: string;
};

export type ChangePasswordValues = {
  oldPassword: string;
  newPassword: string;
};
