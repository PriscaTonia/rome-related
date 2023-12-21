import * as Yup from "yup";

// Validator for INewProduct
const addProductValSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  brand: Yup.string().required("Brand is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  imageUrls: Yup.array().of(Yup.string()),
});

export { addProductValSchema };
