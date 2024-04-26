import fs from 'fs'
import path from 'path'

(() => {
    const data = process.argv.slice(2);
    const result = data
        .map((f, i) => {
            if (f.toLowerCase() == "--name") {
                return { name: data[i + 1] };
            } else return null;
        })
        .filter((item) => item !== null)[0]; 

    const serviceDirectory = `./src/services/${result.name.toLowerCase()}`;
    fs.mkdir(serviceDirectory, { recursive: true }, (error) => {
        const interfacesDirectory = path.join(serviceDirectory, `interfaces`);
        const newService = path.join(serviceDirectory, `${result.name}.ts`);
        const newServiceContent = `
import I${result.name} from './interfaces/I${result.name}';

export class ${result.name} implements I${result.name} {}
        `
        fs.writeFile(newService, newServiceContent, (error) => {
            if(error) {
                console.error('Error unexpected:', error);
                return;
            }
            console.log(`El archivo '${result.name}' se creó dentro del directorio '${serviceDirectory}' correctamente.`);
        })
        fs.mkdir(interfacesDirectory, { recursive: true }, (error) => {
            if(error) {
                console.error('Error unexpected:', error);
                return;
            }
            const newInterface = path.join(interfacesDirectory, `I${result.name}.ts`);
            const newInterfaceContent = `
export default interface I${result.name} {}
            `

            fs.writeFile(newInterface, newInterfaceContent, (error) => {
                if(error) {
                    console.error('Error unexpected:', error);
                    return;
                }
                console.log(`El archivo '${result.name}' se creó dentro del directorio '${serviceDirectory}' correctamente.`);
            })
        })
    })

})()