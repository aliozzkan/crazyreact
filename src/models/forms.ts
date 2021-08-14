export interface LoginForm {
  username: string;
  password: string;
}

export interface ChangePasswordForm {
  "current-password": string;
  "new-password": string;
  "new-password-confirm": string;
}
