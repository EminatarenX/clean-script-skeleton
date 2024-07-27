
import { User } from './User.js';

export interface IUserRepository {
  create(): Promise<User>;
}
