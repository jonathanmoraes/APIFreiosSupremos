import { Request, Response } from "express";
import { Unit, IUnit } from "../database/Unit";
import { Company } from "../database/Company";
import { Asset } from "../database/Asset";
import { isValidObjectId } from "mongoose";

const UnitController = {
  async index(req: Request, res: Response): Promise<Response> {
    const units = await Unit.find().populate("assets").populate("company");
    return res.json(units);
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!isValidObjectId(id)){
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    const unit = await Unit.findById(id).populate("assets").populate("company");
    return res.json(unit);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { name, companyId, assetId } = req.body;
    const company = await Company.findById(companyId);
    const asset = await Asset.findById(assetId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const unit: IUnit = new Unit({
      name,
      company,
      asset,
    });
    company.unit.push(unit);
    await Promise.all([unit.save(), company.save()])
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });

    return res.status(500);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!isValidObjectId(id)){
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    await Unit.findByIdAndUpdate(id, req.body, { new: true })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!isValidObjectId(id)){
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    await Unit.findByIdAndDelete(id)
      .then(async (data) => {
        if (!data) {
          return res.status(400).json({ message: `Unit ${id} does not exist` });
        }
        await Company.findByIdAndUpdate(data.company, {
          $pull: { units: data._id },
        });
        return res.json({ message: `Unit ${id} successfully deleted!` });
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },
};

export default UnitController;
