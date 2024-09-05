import { Router } from "express";
import UserControler from "../controllers/Controler";

const contactsRouter = Router();
const contactCtrl = new UserControler();

contactsRouter.post("/", (req, res) => contactCtrl.save(req, res));
contactsRouter.get("/area/:codArea", (req, res) =>
  contactCtrl.findByName(req, res),
);

export default contactsRouter;
