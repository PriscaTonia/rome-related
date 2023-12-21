const router = require("express").Router();

import { generalMulter, mediaMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import { addMediaValSchema } from "../media/media.validators";
import mediaController from "./media.controller";

router.post(
  "/media",
  [generalMulter.single("file"), validateBy(addMediaValSchema)],
  mediaController.create
);

router.post("/media/delete", mediaController.delete);

router.post("/media/delete-by-url", mediaController.deleteByUrl);

export default router;
