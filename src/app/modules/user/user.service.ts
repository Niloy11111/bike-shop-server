import { TUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
const createUserIntoDB = async (payload: TUser) => {
  payload.id = await generateUserId();

  const user = await User.create(payload);

  return user;
};

const getUsers = async () => {
  const data = await User.find();
  return data;
};

const updateUserProfile = async (id: string, data: Record<string, any>) => {
  // udpate
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

export const UserServices = {
  updateUserProfile,
  createUserIntoDB,
  getUsers,
};
