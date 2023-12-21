import { isMatch } from "../utils/lodash";
import {
  uploadDocToCloud,
  uploadToCloud,
  uploadVideoToCloud,
} from "../lib/cloudinary";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const dateStringToDate = (dateString: string) => {
  console.log({ dateString });
  if (typeof dateString !== "string") {
    throw new Error("Input must be a string");
  }

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date;
};

export function getRandomDate(earliestYear = 5, latestYear = 1) {
  const today = new Date();
  const startYear = today.getFullYear() - earliestYear;
  const endYear = today.getFullYear() - latestYear;

  const randomYear =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1; // Keeping it simple, max day is 28 to avoid issues with February

  const randomDate = new Date(randomYear, randomMonth, randomDay);

  return randomDate;
}

export const MediaMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/*",
  "video/mp4",
  "video/webm",
];

export const DocMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

export const allMimeTypes = [...MediaMimeTypes, ...DocMimeTypes];

export const getMediaType = (mimetype: string) => {
  if (mimetype.includes("image")) {
    return "image";
  } else if (mimetype.includes("video")) {
    return "video";
  } else {
    return "doc";
  }
};

export const uploadFncs = {
  image: uploadToCloud,
  video: uploadVideoToCloud,
  doc: uploadDocToCloud,
};

export const duplicateItem = (item: any, times: number) => {
  const items = [];
  for (let i = 0; i < times; i++) {
    items.push(item);
  }
  return items;
};

export const ellipsify = (str: string, maxLength: number) => {
  if (str.length > maxLength) return str.slice(0, maxLength) + "..";

  return str;
};

export const convertUnixToDate = (unix: number) => {
  return new Date(unix * 1000);
};
