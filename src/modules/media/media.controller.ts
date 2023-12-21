import { Request, Response } from "express";
import {
  deleteFromCloud,
  uploadDocToCloud,
  uploadToCloud,
  uploadVideoToCloud,
} from "../../lib/cloudinary";

import response from "../../utils/response";
import mediaService from "./media.service";
import { getMediaType, uploadFncs } from "../../utils/helpers";
import * as fs from "fs/promises";
import { IMedia } from "./media.types";
import { NotFoundError } from "../../config/errors";

class MediaController {
  async create(req: Request, res: Response) {
    const { file } = req;
    const fileType = getMediaType(file.mimetype);
    const uploader = uploadFncs[fileType];
    const upload = await uploader(file.path);
    // console.log({ file, url: upload.secure_url, upload });

    const media = await mediaService.create({
      filename: upload.filename,
      public_id: upload.public_id,
      size: upload.bytes,
      type: upload.format,
      url: upload.secure_url,
      duration: upload?.duration || null,
    });

    await fs.unlink(file.path);

    res.send(response("Successfully saved media", media));
  }

  async delete(req: Request, res: Response) {
    await deleteFromCloud(req.body.public_id);

    res.send(response("Successfully deleted media"));
  }

  async deleteByUrl(req: Request, res: Response) {
    const url = req.body.url;
    console.log({ url });
    const media: IMedia = await mediaService.findByUrl(url);
    console.log({ media });
    // if (!media) throw new NotFoundError("Media not found");
    await deleteFromCloud(media.public_id);
    await mediaService.deleteByUrl(url);
    res.send(response("Successfully deleted media"));
  }
}

export default new MediaController();
