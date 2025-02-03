import { IBike } from './bike.interface';
import Bike from './bike.model';

const createBike = async (payload: IBike): Promise<IBike> => {
  const result = await Bike.create(payload);
  return result;
};

const getBikes = async (searchTerm: string) => {
  // filter data accordingto searchTerm using $or method

  const query = searchTerm
    ? {
        $or: [
          { category: searchTerm },
          { brand: searchTerm },
          { name: searchTerm },
        ],
      }
    : {};
  const result = await Bike.find(query);

  return result;
};

const getSingleBike = async (id: string) => {
  //get the specific bike from bikes collection
  const result = await Bike.findById(id);
  return result;
};

const updateBike = async (id: string, data: IBike) => {
  // udpate a specific bike
  const result = await Bike.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteBike = async (id: string) => {
  // delete a specific bike
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const bikeService = {
  createBike,
  getBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
