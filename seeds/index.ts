// Seed the DB
import { slugify } from "../src/utils/slugify";
import openDBConnection from "../src/config/db";
import productsJson from "./products.json";
import categoriesJson from "./categories.json";
import adminsModel from "../src/modules/admins/admins.model";
import productsModel from "../src/modules/products/products.model";
import categoriesModel from "../src/modules/categories/categories.model";
import { IReqProduct } from "../src/modules/products/products.types";

const SeedDatabaseOnDev = async () => {
  console.log("Seeding Admins...👨‍🦳 \n");
  await adminsModel.deleteMany();
  await adminsModel.create({
    email: "chidiebereekennia@gmail.com",
    name: "Chidiebere Ekennia",
    password: "12345678",
  });

  console.log("Seeding Categories...🥂 \n");
  await categoriesModel.deleteMany();

  const categoriesData = categoriesJson.map((category) => ({
    ...category,
    slug: slugify(category.name),
  }));

  await categoriesModel.insertMany(categoriesData);

  console.log("Seeding products...🌼 \n");
  await productsModel.deleteMany();

  const productsData = productsJson.map((product: IReqProduct) => ({
    ...product,
    slug: slugify(product.title),
  }));

  await productsModel.insertMany(productsData);
};

(async () => {
  try {
    openDBConnection();

    console.log("Resetting Database...🌊 \n");

    await SeedDatabaseOnDev();

    // end the process

    console.log("SEEDING COMPLETE 🎉🎉🎉 \n");

    process.exit();
  } catch (error) {
    console.log(`An Error occured during seeding: ${error.message}`);
    // process.exitCode = 2;
    process.exit();
  }
})();
