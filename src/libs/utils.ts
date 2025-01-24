import { Config } from "@/libs/type";

// Default configuration object
export const defaultConfig: Config = {
  theme: "dark",
  font: "helvetica",
  pattern: "shape 1",
  update: "14",
  image: "",
  username: true,
  tagline: true,
  lang: false,
  star: false,
  fork: false,
  repo: false,
  UserName: "",
  Tagline: "",
  star_count: 0,
  fork_count: 0,
  repo_count: 0,
};

// Options for theme, font, and pattern
export const themeOptions = ["dark", "light"];
export const fontOptions = ["Helvetica", "Arial", "TimesNewRoman", "Calibri", "Verdana"];
export const patternOptions = ["shape 1", "shape 2"];

// Default URL parameters
export const defaultParams = "theme=default&font=default&pattern=default";

// Function to get URL parameters from config
export const getUrlParams = (config: Config, includeKeys: string[]): string => {
  const params = new URLSearchParams();
  Object.entries(config).forEach(([key, value]) => {
    if (includeKeys.includes(key) && value !== false && value !== "" && value !== null) {
      params.set(key, value);
    }
  });
  return params.toString();
};

// Function to check if URL is complete based on required parameters
export const isUrlComplete = (config: Config, requiredParams: string[]): boolean => {
  if (!config || !requiredParams) return false;
  return requiredParams.every(param => config[param]);
};
