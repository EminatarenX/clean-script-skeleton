
import { Create } from '../../application/create.js';
export class CreateUserController {
  constructor( private readonly create: Create ) {}
   async run(){
     try {
       const result = await this.create.run();
       return result;
     } catch (error) {
        return error;
    }
  }
}
                