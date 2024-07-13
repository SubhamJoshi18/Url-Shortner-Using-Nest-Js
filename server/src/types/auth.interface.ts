import mongoose from 'mongoose';

export interface IPayload {
  userId: string | mongoose.Types.ObjectId;
  username: string;
}

export interface ICustomLoginResponse extends IPayload {
  access_token: string;
}
