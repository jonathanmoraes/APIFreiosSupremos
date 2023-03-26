import { Document, model, Schema } from "mongoose";
import { ICompany } from "./Company";
interface IUser extends Document {
  name: string;
  company: ICompany; 
}

const UserSchema = new Schema<IUser>(
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
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("Users", UserSchema);

export { User, IUser };
