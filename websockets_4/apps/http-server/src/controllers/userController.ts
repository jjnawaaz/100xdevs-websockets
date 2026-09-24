import { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "@repo/api_contracts";
import { httpStatusCodes } from "@repo/status_codes";
import { createUserService } from "../services/userServices.js";

export const Signin = async (req: Request, res: Response) => {
  // validate the data
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: "Please enter valid fields",
    });
  }
  // check-user-service
  //   const user = await createUser(data);
};
export const Signup = async (req: Request, res: Response) => {
  // validate the data
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: "Please enter valid fields",
    });
  }
  const user = await createUserService(parsedData.data, res);
  if (user.success && user.data) {
    return res.status(httpStatusCodes.CREATED).json({
      message: "User successfully created",
    });
  }

  if (!user.success && user.data.message === "User already exists") {
    return res.status(httpStatusCodes.CONFLICT).json({
      message: "User already exists",
    });
  }
  if (!user.success && user.data.message === "Internal Server Error") {
    return res.status(httpStatusCodes.CONFLICT).json({
      message: "User already exists",
    });
  }
};

export const Logout = (req: Request, res: Response) => {};
export const Refresh = (req: Request, res: Response) => {};
