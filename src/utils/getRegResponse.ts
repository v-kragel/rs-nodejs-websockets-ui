import { RegResponseData } from "../types/messages";

export function createErrorRegResponse(
  name: string,
  message: string
): RegResponseData {
  return {
    name,
    index: "0",
    error: true,
    errorText: message,
  };
}

export function createSuccessRegResponse(
  name: string,
  index: string
): RegResponseData {
  return {
    name,
    index,
    error: false,
    errorText: "",
  };
}
