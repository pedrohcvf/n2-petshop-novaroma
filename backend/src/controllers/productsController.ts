import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema";
import { serializeBigInt } from "../utils/utils";
import { asyncHandler } from "../middlewares/asyncHandler";
import { HTTPCODES } from "../utils/httpCodes";
import * as productsServices from "../services/productsServices";

export const getAll = asyncHandler(async(req: Request, res: Response)=> {
    const { page, limit } = req.query
    const products = await productsServices.getAll(page as string, limit as string);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const getById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const products = await productsServices.getById(id);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const create = asyncHandler(async(req: Request, res: Response)=> {
    const body = createProductSchema.parse(req.body);
    const products = await productsServices.create(body);
    res.status(HTTPCODES.CREATED).json(serializeBigInt(products));
});

export const update = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const body = updateProductSchema.parse(req.body);
    const products = await productsServices.update(id, body);
    res.status(HTTPCODES.OK).json(serializeBigInt(products));
});

export const deleteById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const products = await productsServices.deleteById(id);
    res.status(HTTPCODES.NOCONTENT).json(serializeBigInt(products));
});