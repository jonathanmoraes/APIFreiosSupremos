import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Company, ICompany } from "../database/Company";

const CompanyController = {
  async index(req: Request, res: Response): Promise<Response> {
    const companies = await Company.find().populate("users").populate("unit");
    return res.status(200).json(companies);
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    const company = await Company.findById(id).populate("users").populate("unit");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.json(company);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const company: ICompany = new Company({
      name,
    });
    await company
      .save()
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    })
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
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    await Company.findByIdAndDelete(id)
      .then(() => {
        return res.json({ message: `Company ${id} successfully deleted!` });
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },
};

export default CompanyController;
