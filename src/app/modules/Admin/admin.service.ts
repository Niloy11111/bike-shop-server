import { Blog } from '../Blog/blog.model';
import { User } from '../user/user.model';

const blockUserFromDB = async (id: string) => {
  const blog = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return blog;
};

const deleteBlogByAdminFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

export const adminServices = {
  deleteBlogByAdminFromDB,
  blockUserFromDB,
};
