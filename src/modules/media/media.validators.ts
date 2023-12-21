import * as Yup from "yup";

export const addMediaValSchema = Yup.object({
  file: Yup.string(),
});
