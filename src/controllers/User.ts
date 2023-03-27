import { Request, Response } from "express";
import { IUser, User } from "../database/User";
import { Company } from "../database/Company";
import { isValidObjectId } from "mongoose";

const UserController = {
  async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find().populate("company");
    return res.status(200).json(users);
  },

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Id is not valid ObjectId" });
    }
    const user = await User.findById(id).populate("company");
    return res.json(user);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { name, companyId } = req.body;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const user: IUser = new User({
      name,
      company,
    });
    company.users.push(user);

    await Promise.all([user.save(), company.save()])
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
    await User.findByIdAndUpdate(id, req.body, {
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
    await User.findByIdAndDelete(id)
      .then(() => {
        return res
          .status(200)
          .json({ message: `User ${id} successfully deleted!` });
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
    return res.status(500);
  },
};

export default UserController;
