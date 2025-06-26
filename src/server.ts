import app from "./app";
import config from "./app/config";
// getting-started.js
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on Port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
