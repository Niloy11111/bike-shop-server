import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string; name: string },
  secret: string,
  expiresIn: string | number, // Allow both string and number
) => {
  const signOptions: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'], // Explicitly cast
  };

  return jwt.sign(jwtPayload, secret, signOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
