import dotenv from 'dotenv';
import path from 'path';

// specifying where is the .env file lcoated

dotenv.config({ path: path.join(process.cwd(), '.env') });

//exporting PORT and DATABASE_URL

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
};
