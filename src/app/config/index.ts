import "dotenv/config";

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;


export default {
  port,
  dbUrl,
};
