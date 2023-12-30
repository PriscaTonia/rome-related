// Seed the DB
import { slugify } from "../src/utils/slugify";
import openDBConnection from "../src/config/db";
import productsJson from "./products.json";
import adminsJson from "./admins.json";
import categoriesJson from "./categories.json";
import adminsModel from "../src/modules/admins/admins.model";
import productsModel from "../src/modules/products/products.model";
import categoriesModel from "../src/modules/categories/categories.model";
import { IReqProduct } from "../src/modules/products/products.types";
import { ICategory } from "../src/modules/categories/categories.types";

import bcrypt from "bcrypt";

const SeedDatabaseOnDev = async () => {
  console.log("Seeding Admins...👨‍🦳 \n");
  await adminsModel.deleteMany();
  
  const adminsData = adminsJson.map((admin) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(admin.password, salt);
    const password = hashed;
    return { ...admin, password };
  });

  await adminsModel.insertMany(adminsData);

  console.log("Seeding Categories...🥂 \n");
  await categoriesModel.deleteMany();

  const categoriesData: ICategory[] = categoriesJson.map((category) => {
    return new categoriesModel({ ...category, slug: slugify(category.name) });
  });

  await categoriesModel.insertMany(categoriesData);

  console.log("Seeding products...🌼 \n");
  await productsModel.deleteMany();

  const productsData = productsJson.map((product: IReqProduct) => {
    const categoryId = categoriesData.find((category) => {
      return category.name === product.category;
    })?._id;
    return {
      ...product,
      category: categoryId,
      slug: slugify(product.title),
    };
  });

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
