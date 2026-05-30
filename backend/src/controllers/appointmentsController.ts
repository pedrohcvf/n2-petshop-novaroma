import { Request, Response} from "express";
import { createAppointmentsSchema, updateAppointmentsSchema } from "../schemas/appointmentsSchema";
import { serializeBigInt } from "../utils/utils";
import { asyncHandler } from "../middlewares/asyncHandler";
import { HTTPCODES } from "../utils/httpCodes";
import * as appointmentsServices from "../services/appointmentsServices";

export const getAll = asyncHandler(async(req: Request, res: Response)=> {
    const { page, limit } = req.query
    const products = await appointmentsServices.getAll(page as string, limit as string);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const getById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const products = await appointmentsServices.getById(id);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const create = asyncHandler(async(req: Request, res: Response)=> {
    const body = createAppointmentsSchema.parse(req.body);
    const products = await appointmentsServices.create(body);
    res.status(HTTPCODES.CREATED).json(serializeBigInt(products));
});

export const update = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const body = updateAppointmentsSchema.parse(req.body);
    const products = await appointmentsServices.update(id, body);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const deleteById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const products = await appointmentsServices.deleteById(id);
    res.status(HTTPCODES.NOCONTENT).json(serializeBigInt(products));
});