import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Replace "*" with your frontend URL in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const response = (data: unknown, init: ResponseInit = {}) => {
  return NextResponse.json(data, { ...init, headers });
};
