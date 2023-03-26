import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";
import { IUnit } from "./Unit";

interface ICompany extends Document {
  name: string;
  users: [IUser]; 
  unit: [IUnit];
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    unit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = model<ICompany>("Company", CompanySchema);

export { Company, ICompany };
