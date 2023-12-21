const randomDigits = (length: number = 6) => {
  let range = Array.from(Array(10).keys());
  let token = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * range.length);
    token += range[randomIndex];
  }
  return token;
};

export { randomDigits };
