import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
