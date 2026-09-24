import { SigninType } from "@repo/api_contracts";
import { verifyHash } from "../utils/bcryptUtils.js";
import { db } from "@repo/db";
import { ERROR_CODES, httpStatusCodes } from "@repo/codes";
import { AppError } from "../middlewares/errorHandler.js";

// create user service
export const SignInService = async (data: SigninType) => {
  // find user in db
  const user = await db.orm.public.User.where({
    email: data.email,
  }).first();

  if (!user) {
    throw new AppError(
      "Invalid Credentials",
      ERROR_CODES.INVALID_CREDENTIALS,
      httpStatusCodes.UNAUTHORIZED,
    );
  }

  // verify hash
  const isVerified = await verifyHash(data.password, user.password);
  if (!isVerified) {
    throw new AppError(
      "Invalid Credentials",
      ERROR_CODES.INVALID_CREDENTIALS,
      httpStatusCodes.UNAUTHORIZED,
    );
  }

  return {
    success: true,
    data: {
      id: user.id,
      email: user.email,
    },
  };
};
