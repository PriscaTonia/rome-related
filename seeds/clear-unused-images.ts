// Seed the DB
import openDBConnection from "../src/config/db";
import productsModel from "../src/modules/products/products.model";
import mediaService from "../src/modules/media/media.service";
import { deleteFromCloud } from "../src/lib/cloudinary";
import { IMedia } from "../src/modules/media/media.types";

const CleanDatabase = async () => {
  // Step 1: Get a list of all unique image URLs used in product image URLs
  const allProducts = await productsModel.find();
  const usedImageUrls = new Set<string>();

  for (const product of allProducts) {
    for (const imageUrl of product.imageUrls) {
      usedImageUrls.add(imageUrl);
    }
  }

  // Step 2: Get a list of all media records from the media collection
  const allMediaRecords = await mediaService.findAll();

  // Step 3: Compare and identify unused media records
  const unusedMediaRecords: IMedia[] = allMediaRecords.filter(
    (mediaRecord: IMedia) => {
      return !usedImageUrls.has(mediaRecord.url);
    }
  );

  // Step 4: Delete unused media records from Cloudinary and the media collection
  for (const mediaRecord of unusedMediaRecords) {
    // Delete from Cloudinary
    console.log(`Deleting ${mediaRecord.url} from Cloudinary...`);
    await deleteFromCloud(mediaRecord.public_id);

    // Delete from the media collection
    await mediaService.deleteByUrl(mediaRecord.url);
  }

  console.log("Cleaned unused media files. 🧹 \n");
};

(async () => {
  try {
    openDBConnection();

    console.log("Cleaning media files... 🌊 \n");

    await CleanDatabase();

    // End the process
    console.log("CLEANUP COMPLETE 🎉🎉🎉 \n");

    process.exit();
  } catch (error) {
    console.error(`An Error occurred during cleanup: ${error.message}`);
    process.exit(1);
  }
})();
