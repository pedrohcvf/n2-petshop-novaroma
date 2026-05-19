import {asyncHandler} from "../middlewares/asyncHandler";
import {HTTPCODES} from "../utils/httpCodes";
import {Request, Response} from "express";

export const test = asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPCODES.OK).json("true");
});