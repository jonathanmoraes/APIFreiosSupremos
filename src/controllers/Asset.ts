import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { Asset, IAsset } from "../database/Asset";
import { Unit } from "../database/Unit";

const AssetController = {
  async index(req: Request, res: Response): Promise<Response> {
    let assets = await Asset.find().populate("unit");
    return res.status(200).json(assets);
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    let assets = await Asset.findById(id).populate("unit");
    if (!assets) {
      return res.status(404).json({ message: "Asset not found" });
    }
    return res.status(200).json(assets);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const {
      img,
      name,
      description,
      model,
      owner,
      status,
      healthLevel,
      unitId,
    } = req.body;
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    const asset: IAsset = new Asset({
      img,
      name,
      description,
      model,
      owner,
      status,
      healthLevel,
      unit: unit,
    });
    unit.assets.push(asset);
    await Promise.all([asset.save(), unit.save()])
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { img, name, description, model, owner, status, healthLevel, unitId } =
      req.body;
    
    const unit = await Unit.findById(unitId);
    if(unitId && !unit){
      return res.status(404).json({ error: "Unit not found" });
    }
    await Asset.findByIdAndUpdate(id, {
      img: img,
      name: name,
      description: description,
      model: model,
      owner: owner,
      status: status,
      healthLevel: healthLevel,
      unit: unit,
    })
      .then((data) => {
        return res.json({ data });
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Asset.findByIdAndDelete(id)
      .then((data) => {
        return res.json({ message: `Asset ${id} successfully deleted!` });
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },
};

export default AssetController;
