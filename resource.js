import fs from "fs";
import path from "path";

(() => {
  const data = process.argv.slice(2);

  const result = {name: data[0]}
    console.log(result)
	if(!result) {
		console.log("Error: '--name' argument is required")
		process.exit(1);
	}
  
    const directory = `./src/${result.name.toLowerCase()}`;
    fs.mkdir(directory, { recursive: true }, (error) => {
        if (error) {
          console.error('Error unexpected:', error);
          return;
        }
      
        const application = path.join(directory, `application`);
        const infrastructure = path.join(directory, `infrastructure`);
        const domain = path.join(directory, `domain`);
        fs.mkdir(domain, { recursive: true }, (error) => {
            const domainEntity = path.join(domain, `${result.name}.ts`);
            const domainInterface = path.join(domain, `I${result.name}Repository.ts`);
            const domainContent = `
export class ${result.name} {
  constructor() {}

  async save(){
    return "Hello World";
  }
}
            `
            const domainInterfaceContent = `
import { ${result.name} } from './${result.name}.js';

export interface I${result.name}Repository {
  create(): Promise<${result.name}>;
}
`
            fs.writeFile(domainEntity, domainContent, (error) => {
                if (error) {
                    console.error('Error unexpected:', error);
                    return;
                }
                console.log(`El archivo '${result.name}' se creó dentro del directorio '${domain}' correctamente.`);
            })
            fs.writeFile(domainInterface, domainInterfaceContent, (error) => {
                if (error) {
                    console.error('Error unexpected:', error);
                    return;
                }
                console.log(`El archivo 'I${result.name}Repository' se creó dentro del directorio '${domain}' correctamente.`);
            })
        });
        fs.mkdir(infrastructure, { recursive: true }, (error) => {
            const infrastructureRepository = path.join(infrastructure, `${result.name}Repository.ts`);
            const infrastructureContent = `
import type { I${result.name}Repository } from '../domain/I${result.name}Repository.js';
import { ${result.name} } from '../domain/${result.name}.js';
export class ${result.name}Repository implements I${result.name}Repository {
  constructor() {}
   async create(): Promise<${result.name}>{
     return new ${result.name}();
   }
}
`
            fs.writeFile(infrastructureRepository, infrastructureContent, (error) => {
                if (error) {
                    console.error('Error unexpected:', error);
                    return;
                }
                console.log(`El archivo '${result.name}Repository' se creó dentro del directorio '${infrastructure}' correctamente.`);
            })

            const controller = path.join(infrastructure, `controllers`);
            fs.mkdir(controller, { recursive: true }, (error) => {
                if(error){
                    console.error('Error unexpected:', error);
                    return;
                }

                const controllerCreate = path.join(controller, `Create${result.name}Controller.ts`);
                const controllerContent = `
import { Create } from '../../application/create.js';
export class Create${result.name}Controller {
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
                `
                fs.writeFile(controllerCreate, controllerContent, (error) => {
                    if (error) {
                        console.error('Error unexpected:', error);
                        return;
                    }
                    console.log(`El archivo 'Create${result.name}Controller' se creó dentro del directorio '${controller}' correctamente.`);
                })
            })


        })


        fs.mkdir(application, { recursive: true }, (error) => {
            if (error) {
                console.error('Error unexpected:', error);
                return;
            }

            const createUsecase = path.join(application, `create.ts`);
            const createContent = `
import type { I${result.name}Repository } from '../domain/I${result.name}Repository.js';
export class Create {
  constructor( private readonly ${result.name.toLowerCase()}Repository: I${result.name}Repository  ) {}
  async run(){
    return await this.${result.name.toLowerCase()}Repository.create();
   }
}
`
            
            fs.writeFile(createUsecase, createContent, (error) => {
                if (error) {
                    console.error('Error unexpected:', error);
                    return;
                }
                console.log(`El archivo 'create' se creó dentro del directorio '${application}' correctamente.`);
            })
            
        })

      });
})();
