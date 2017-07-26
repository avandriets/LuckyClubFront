export class Users {
  id: number;
  screen_name: string;
  first_name: string;
  last_name: string;
  photo_url:string;
  user_id: number;
  created_at: string;
  updated_at: string;
  admin_user: boolean;
}

export enum LoginStatusEnum{
  inProcess,
  Finish,
  FinishError,
  LoggedIn,
  LoggedOut
}
