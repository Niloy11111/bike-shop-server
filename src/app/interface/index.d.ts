declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
        role: string;
        phone: string;
        address: string;
        city: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
    }
  }
}
