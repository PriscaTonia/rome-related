// Seed the DB
import openDBConnection from "../src/config/db";
import productsModel from "../src/modules/products/products.model";
import mediaService from "../src/modules/media/media.service";
import { uploadFileByUrl } from "../src/lib/cloudinary";

const ModifyDatabase = async () => {
  console.log("Migrating product files...🌼 \n");
  const allProducts = await productsModel.find();

  const updateOperations: any[] = [];

  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    const updatedImageUrls: String[] = [];

    for (let j = 0; j < product.imageUrls.length; j++) {
      const url = product.imageUrls[j];
      const upload = await uploadFileByUrl(url);

      // Create a new media record for the uploaded file
      const mediaRecord = {
        filename: upload.original_filename,
        public_id: upload.public_id,
        size: upload.bytes,
        type: upload.format,
        url: upload.secure_url,
        duration: upload?.duration || null,
      };

      await mediaService.create(mediaRecord);

      // Delete the old media record by URL
      await mediaService.deleteByUrl(url);

      updatedImageUrls.push(upload.secure_url);
    }

    // Construct an update operation for this product
    updateOperations.push({
      updateOne: {
        filter: { _id: product._id },
        update: { $set: { imageUrls: updatedImageUrls } },
      },
    });
  }

  // Use bulkWrite to perform multiple update operations efficiently
  await productsModel.bulkWrite(updateOperations);

  console.log("Migrated product files. 🌼 \n");
};

(async () => {
  try {
    openDBConnection();

    console.log("Migrating all media files...🌊 \n");

    await ModifyDatabase();

    // end the process

    console.log("MIGRATION COMPLETE 🎉🎉🎉 \n");

    process.exit();
  } catch (error) {
    console.error(`An Error occurred during seeding: ${error.message}`);
    process.exit(1);
  }
})();
