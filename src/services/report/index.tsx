"use client";
import axiosInstance from "../interceptor";

async function apiCalls(method, payloadData) {
  if (method === "get") {
    const res = await axiosInstance[`${method}`](payloadData);
    return res;
  } else if (method === "post" || method === "put") {
    const res = await axiosInstance[`${method}`](
      payloadData?.url,
      payloadData.data
    );
    return res;
  }
}

export { apiCalls };
