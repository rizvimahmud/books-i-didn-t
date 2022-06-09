import { AxiosError } from "axios";

export function handleError(error: AxiosError) {
  if (error.isAxiosError && error.message) {
    //@ts-ignore
    return error.response?.data?.error;
  }
  return "Unexpected error";
}
