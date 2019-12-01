import express from "express";
import dragonService from "../services/DragonService";

export default class DragonController {
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
      let data = await dragonService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await dragonService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await dragonService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await dragonService.delete(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
