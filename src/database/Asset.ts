import { Document, model, Schema } from "mongoose";
import { IUnit } from "./Unit";

interface IAsset extends Document {
  img: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
  unit: IUnit;
}

const AssetSchema = new Schema<IAsset>(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Running", "Alerting", "Stopped"],
      required: true,
    },
    healthLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = model<IAsset>("Asset", AssetSchema);

export { Asset, IAsset };
