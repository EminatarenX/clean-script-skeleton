
import type { IUserRepository } from '../domain/IUserRepository.js';
export class Create {
  constructor( private readonly userRepository: IUserRepository  ) {}
  async run(){
    return await this.userRepository.create();
   }
}
