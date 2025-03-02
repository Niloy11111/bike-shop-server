import { User } from '../user/user.model';

const blockUserFromDB = async (id: string) => {
  const blog = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return blog;
};

const deleteUserByAdminFromDB = async (id: string) => {
  const blog = await User.findByIdAndDelete(id);
  return blog;
};

export const adminServices = {
  deleteUserByAdminFromDB,
  blockUserFromDB,
};
