import { User } from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {},
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};

export const generateUserId = async () => {
  let currentId = (0).toString();
  const lasUserId = await findLastUserId();

  if (lasUserId) {
    currentId = lasUserId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(6, '0');
  const currentYear = new Date().getFullYear();
  incrementId = `${currentYear}${incrementId}`;

  return incrementId;
};
