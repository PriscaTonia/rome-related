import * as Yup from "yup";

// Validator for INewCategory
export const addCategoryValSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  isDisabled: Yup.boolean(),
});

export const updateCategoryValSchema = Yup.object({
  name: Yup.string(),
  isDisabled: Yup.boolean(),
});
