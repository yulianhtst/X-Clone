import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SESSION_SECRET } from "@/Constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { PIN } = req.body;
  const sessionToken = req.headers.authorization?.split(" ")[1];

  try {
    if (!PIN) {
      throw new Error("Enter a pin");
    }
    if (!sessionToken) {
      throw new Error("No session token provided");
    }

    const result: any = jwt.verify(sessionToken, JWT_SESSION_SECRET);

    if (result.PIN !== Number(PIN)) {
      throw new Error("PIN does not match");
    }

    res.json({
      message: "PIN match",
    });
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        error: "JsonWebTokenError",
        message: "Session Expired",
      });
    } else {
      res.status(400).json({
        error: "BadRequest",
        message: error.message,
      });
    }
  }
}
