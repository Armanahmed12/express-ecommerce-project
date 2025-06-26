import app from "./app";
import config from "./app/config";


async function main() {
  
    app.listen(config.port, () => {
      console.log(`Example app listening on Port: ${config.port}`);
    });

}

main();
