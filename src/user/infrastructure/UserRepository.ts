
import type { IUserRepository } from '../domain/IUserRepository.js';
import { User } from '../domain/User.js';
export class UserRepository implements IUserRepository {
  constructor() {}
   async create(): Promise<User>{
     return new User();
   }
}
