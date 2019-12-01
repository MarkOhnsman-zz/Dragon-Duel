import express from "express";
import championService from "../services/ChampionService";

export default class ChampionController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      //.post("", this.create)
      .get("/:id", this.getById);
    //.delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await championService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await championService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await championService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await championService.delete(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
