import { Document, model, Schema } from "mongoose";
import { ICompany } from "./Company";
import { IAsset } from "./Asset";

interface IUnit extends Document {
  name: string;
  company: ICompany;
  assets: [IAsset];
}

const UnitSchema = new Schema<IUnit>(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
  },
  { timestamps: true }
);

const Unit = model<IUnit>("Unit", UnitSchema);

export { Unit, IUnit };
