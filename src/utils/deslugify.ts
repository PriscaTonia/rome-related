export const deslugify = (value: string) => {
  value = value.replace(/\/+/g, "");
  value = value.replace("[id]", "");
  // let words = value.split("-");
  // words = words.map((word) => uppercase(word));
  // value = words.join(" ");
  return value;
};

const uppercase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const unslugify = (value: string) => {
  value = value.replace(/\/+/g, "");
  value = value.replace("[id]", "");
  let words = value.split("-");
  words = words.map((word) => uppercase(word));
  value = words.join(" ");
  return value;
}