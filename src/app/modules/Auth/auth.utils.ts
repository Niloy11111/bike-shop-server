import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { _id: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
