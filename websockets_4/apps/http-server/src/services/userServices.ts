import { SigninType, SignupType } from "@repo/api_contracts";
import { createHash } from "../utils/bcryptUtils.js";
import { Response } from "express";
import { db } from "@repo/db";

// create user service
export const createUserService = async (data: SignupType, res: Response) => {
  try {
    const hashedPassword = await createHash(data.password);
    const user = await db.orm.public.User.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && "sqlState" in err && err.sqlState === "") {
      return {
        success: false,
        data: {
          message: "User already exists",
        },
      };
    }
    return {
      success: false,
      data: {
        message: "Internal Server Error",
      },
    };
  }
};

export const checkSigninUser = async (data: SigninType) => {
  // get data from db
  const user = await db.orm.public.User.where({
    email: data.email,
  }).first();
  // verify password
  // return required fields
};
