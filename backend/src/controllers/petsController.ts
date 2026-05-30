import { Request, Response } from "express"
import { asyncHandler } from "../middlewares/asyncHandler";
import * as petsService from "../services/petsService";
import { HTTPCODES } from "../utils/httpCodes";
import { serializeBigInt } from "../utils/utils";
import { createPetsSchema } from "../schemas/petsSchemas";



export const getAll = asyncHandler(async(req: Request, res: Response)=> {
    const pets = await petsService.getAll();
    res.status(HTTPCODES.OK).json(serializeBigInt(pets))
});

export const getById = asyncHandler(async(req: Request, res: Response)=> {
    const {id} = req.params
    const pets = await petsService.getById(id)
    res.status(HTTPCODES.OK).json(serializeBigInt(pets))
});

export const create = asyncHandler(async(req:Request, res: Response)=> {
    const body = createPetsSchema.parse(req.body)
    const pets = await petsService.create(body)
    res.status(HTTPCODES.CREATED).json(serializeBigInt(pets))
})

export const update = asyncHandler(async(req:Request, res: Response)=> {
    const {id} = req.params
    const body = createPetsSchema.parse(req.body)
    const pets = await petsService.update(id,body)
    res.status(HTTPCODES.CREATED).json(serializeBigInt(pets))
})

export const deleteById = asyncHandler(async(req:Request, res: Response)=> {
    const {id} = req.params
    const pets = await petsService.deleteById(id)
    res.status(HTTPCODES.NOCONTENT).json(serializeBigInt(pets))
})