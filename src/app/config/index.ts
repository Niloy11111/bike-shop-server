import dotenv from 'dotenv';
import path from 'path';

// specifying where is the .env file lcoated

dotenv.config({ path: path.join(process.cwd(), '.env') });

//exporting PORT and DATABASE_URL

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
