import * as Yup from "yup";

// Validator for INewOrder
const addOrderValSchema = Yup.object({
  comments: Yup.string().default(""),
  status: Yup.string().required("Status is required"),
});

const updateOrderValSchema = Yup.object({
  comments: Yup.string().default(""),
  status: Yup.string().required("Status is required"),
});

export { addOrderValSchema, updateOrderValSchema };
