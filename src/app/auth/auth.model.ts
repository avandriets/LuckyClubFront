export class Users {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export enum LoginStatusEnum{
  inProcess,
  Finish,
  FinishError
}
