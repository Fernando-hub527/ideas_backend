import request from "supertest";
import express from "express";

export function validateProtectedRoutes(
  methodName: "post" | "get" | "delete" | "patch",
  endpoint: string,
  getApp: () => express.Application
) {
  it("if token not is not provide, status 401 is returned", async () => {
    const response = await request(getApp())[methodName](endpoint);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toMatchObject({ message: "Token not provided" });
  });

  it("if invalid token is provide, status 401 is returned", async () => {
    const response = await request(getApp())
      [methodName](endpoint)
      .set("Cookie", [`authToken=Bearer kkldsfjslkdfjslkdfjslkdfjlskdfj`])

    expect(response.statusCode).toEqual(401);
    expect(response.body).toMatchObject({ message: "Invalid token" });
  });
}
