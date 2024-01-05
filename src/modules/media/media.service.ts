import Media from "./media.model";
import { IMedia } from "../media/media.types";

class MediaService {
  findAll() {
    return Media.find();
  }
  findByUrl(url: string) {
    return Media.findOne({ url });
  }

  create(media: IMedia) {
    return Media.create(media);
  }

  delete(id: string) {
    return Media.findByIdAndDelete(id);
  }

  deleteByUrl(url: string) {
    return Media.findOneAndDelete({ url });
  }
}

export default new MediaService();
