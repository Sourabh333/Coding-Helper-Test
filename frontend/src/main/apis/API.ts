import { doGet } from "./ApiUtils";

const getSubId = () => {
  return doGet<string>("message");
};

export { getSubId };
