import mongoose from "mongoose";
import Game from "../models/Game";
import ApiError from "../utils/ApiError";
import championService from "./ChampionService";
import dragonService from "./DragonService";

const _repository = mongoose.model("Game", Game);

function _diceRoller(str) {
  str = str.toLowerCase().split("d");
  var count = str[0];
  var die = str[1];
  var result = {
    total: 0,
    rolls: []
  };
  for (var i = 0; i < count; i++) {
    let dice = Math.floor(Math.random() * Math.floor(die) + 1);
    result.total += dice;
    result.rolls.push(dice);
  }
  return result;
}

class GameService {
  async getAll() {
    return await _repository.find({});
  }
  async getOne(query) {
    return await _repository.findOne(query).populate("dragon champion");
  }
  async getById(id) {
    let data = await _repository.findById(id).populate("champion dragon");
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
    return data;
  }
  async create(data) {
    let [dragon, champion] = await Promise.all([
      dragonService.getById(data.dragon),
      championService.getById(data.champion)
    ]);
    // @ts-ignore
    data.dragonHp = dragon.maxHp;
    // @ts-ignore
    data.championHp = champion.maxHp;
    return await _repository.create(data);
  }
  async attack(game, request) {
    if (game.gameOver) {
      throw new ApiError("Game Over, no further attacks allowed", 405);
    }
    let attack = game.champion.attacks.find(
      a => a.name == request || a.damage == request
    );
    if (!attack) {
      throw new ApiError("Invalid Attack Name", 400);
    }
    //Calculate Damage
    let playerDamage = _diceRoller(attack.damage);
    let dragonDamage = _diceRoller("3d10");
    //Apply Damage
    game.dragonHp -= playerDamage.total;
    game.championHp -= dragonDamage.total;
    //Update Game Status
    game.history.push(
      `${game.champion.name} used ${
        attack.name
      }, they rolled ${playerDamage.rolls.toString()} totalling ${
        playerDamage.total
      } damage. The ${
        game.dragon.name
      } used claw attack rolling ${dragonDamage.rolls.toString()} totaling ${
        dragonDamage.total
      } in response`
    );
    if (game.dragonHp <= 0 || game.championHp <= 0) {
      game.gameOver = true;
    }
    let savedGame = await game.save();
    return savedGame;
  }
  async delete(id) {
    let doc = await _repository.findOneAndRemove({ _id: id });
    if (!doc) {
      throw new ApiError("Invalid Id", 400);
    }
  }
}

const gameService = new GameService();
export default gameService;
