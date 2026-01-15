export interface IPayload {
  userId: string;
  role: string;
}

export type AuthedRequest = Request & { user: IPayload };
