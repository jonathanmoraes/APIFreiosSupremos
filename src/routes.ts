import { Router } from "express";
import CompanyController from "./controllers/Company";
import AssetController from "./controllers/Asset";
import UnitController from "./controllers/Unit";
import UserController from "./controllers/User";
const router = Router();

//Company Routes
router.get("/company", CompanyController.index);
router.get("/company/:id", CompanyController.findById);
router.post("/company", CompanyController.create);
router.put("/company/:id", CompanyController.update);
router.delete("/company/:id", CompanyController.delete);


//Unit Routes
router.get("/unit", UnitController.index);
router.get("/unit/:id", UnitController.findById);
router.post("/unit", UnitController.create);
router.put("/unit/:id", UnitController.update);
router.delete("/unit/:id", UnitController.delete);


//User Routes
router.get("/user", UserController.index);
router.get("/user/:id", UserController.findById);
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);


//Asset Routes
router.get("/asset", AssetController.index);
router.get("/asset/:id", AssetController.findById);
router.post("/asset", AssetController.create);
router.put("/asset/:id", AssetController.update);
router.delete("/asset/:id", AssetController.delete);

export default router;
