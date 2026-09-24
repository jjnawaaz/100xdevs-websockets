import { CookieOptions, Request, Response } from "express";
import { SigninSchema, SignupSchema } from "@repo/api_contracts";
import { ERROR_CODES, httpStatusCodes } from "@repo/codes";
// import {
//   createUserService,
//   SigninUserService,
// } from "../services/userServices.js";
import {
  access_token_options,
  createToken,
  refresh_token_options,
  TOKEN,
} from "../utils/jwtUtils.js";
import { SignInService } from "../services/userServices.js";
import { AppError } from "../middlewares/errorHandler.js";

// export const Signup = async (req: Request, res: Response) => {
//   // validate the data
//   const parsedData = SignupSchema.safeParse(req.body);
//   if (!parsedData.success) {
//     return res.status(httpStatusCodes.BAD_REQUEST).json({
//       message: "Please enter valid fields",
//     });
//   }
//   const user = await createUserService(parsedData.data);
//   if (user.success && user.data) {
//     return res.status(httpStatusCodes.CREATED).json({
//       message: "User successfully created",
//     });
//   }

//   if (!user.success && user.data.message === "User already exists") {
//     return res.status(httpStatusCodes.CONFLICT).json({
//       message: "User already exists",
//     });
//   }
//   if (!user.success && user.data.message === "Internal Server Error") {
//     return res.status(httpStatusCodes.CONFLICT).json({
//       message: "User already exists",
//     });
//   }
// };

export const Signin = async (req: Request, res: Response) => {
  // validate fields
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: "Please enter valid fields",
    });
  }

  // call signin user service
  const user = await SignInService(parsedData.data);

  if (user.success && user.data) {
    // create jwt token here
    const access_token = createToken(user.data, TOKEN.ACCESS_TOKEN);
    const refresh_token = createToken(user.data, TOKEN.REFRESH_TOKEN);

    // set tokens in cookies
    res.cookie(
      "access_token",
      access_token,
      access_token_options as CookieOptions,
    );
    res.cookie(
      "refresh_token",
      refresh_token,
      refresh_token_options as CookieOptions,
    );
    return res.status(httpStatusCodes.OK).json({
      message: "User successfully Signed In",
    });
  }
};
export const Refresh = (req: Request, res: Response) => {};
