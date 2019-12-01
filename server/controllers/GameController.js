import express from "express";
import gameService from "../services/GameService";
import ApiError from "../utils/ApiError";

export default class GameController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .post("", this.create)
      .put("/:id", this.attack)
      .get("/:id", this.getById)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await gameService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await gameService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await gameService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async attack(req, res, next) {
    try {
      if (!req.body.attack) {
        throw new ApiError(
          "You must provide the 'attack' property with a vaule of the attack name",
          400
        );
      }
      let game = await gameService.getById(req.params.id);
      let result = await gameService.attack(game, req.body.attack);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await gameService.delete(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
