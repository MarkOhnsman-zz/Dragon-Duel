import mongoose from "mongoose";
import Champion from "../models/Champion";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Champion", Champion);

class ChampionService {
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
    return await _repository.findOneAndRemove({ _id: id });
  }
}

const championService = new ChampionService();
export default championService;
