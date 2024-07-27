import fs from "fs";
import path from "path";

(() => {
  const data = process.argv.slice(2);
  const result = { name: data[0] };
  if (!result) {
    console.log("Error: '--name' argument is required");
    process.exit(1);
  }

  const serviceDirectory = `./src/services`;
  fs.mkdir(serviceDirectory, { recursive: true }, (error) => {
    const interfacesDirectory = path.join(serviceDirectory, `interfaces`);
    const newService = path.join(serviceDirectory, `${result.name}.ts`);
    const newServiceContent = `
import I${result.name} from './interfaces/I${result.name}';

export class ${result.name} implements I${result.name} {}
        `;
    fs.writeFile(newService, newServiceContent, (error) => {
      if (error) {
        console.error("Error unexpected:", error);
        return;
      }
      console.log(
        `El archivo '${result.name}' se creó dentro del directorio '${serviceDirectory}' correctamente.`
      );
    });
    fs.mkdir(interfacesDirectory, { recursive: true }, (error) => {
      if (error) {
        console.error("Error unexpected:", error);
        return;
      }
      const newInterface = path.join(interfacesDirectory, `I${result.name}.ts`);
      const newInterfaceContent = `
export default interface I${result.name} {}
            `;

      fs.writeFile(newInterface, newInterfaceContent, (error) => {
        if (error) {
          console.error("Error unexpected:", error);
          return;
        }
        console.log(
          `El archivo '${result.name}' se creó dentro del directorio '${serviceDirectory}' correctamente.`
        );
      });
    });
  });
})();
