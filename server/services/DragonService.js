import mongoose from "mongoose";
import Dragon from "../models/Dragon";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Dragon", Dragon);

class DragonService {
  async getAll() {
    return await _repository.find({});
  }
  async getOne(query) {
    return await _repository.findOne(query);
  }
  async getById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
    return data;
  }
  async create(data) {
    return await _repository.create(data);
  }
  async delete(id) {
    let doc = await _repository.findOneAndRemove({ _id: id });
    if (!doc) {
      throw new ApiError("Invalid Id", 400);
    }
  }
}

const dragonService = new DragonService();
export default dragonService;
