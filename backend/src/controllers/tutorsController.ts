import { Request, Response } from "express";
import {createTutorsSchema, updateTutorsSchema} from "../schemas/tutorsSchema";
import { serializeBigInt } from "../utils/utils";
import { asyncHandler } from "../middlewares/asyncHandler";
import { HTTPCODES } from "../utils/httpCodes";
import * as tutorsService from "../services/tutorsServices";

export const getAll = asyncHandler(async(req: Request, res: Response)=> {
    const tutors = await tutorsService.getAll();
    res.status(HTTPCODES.OK).json(serializeBigInt(tutors));
});

export const getById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const tutors = await tutorsService.getById(id);
    res.status(HTTPCODES.OK).json(serializeBigInt(tutors));
});

export const create = asyncHandler(async(req: Request, res: Response)=> {
    const body = createTutorsSchema.parse(req.body);
    const tutors = await tutorsService.create(body);
    res.status(HTTPCODES.CREATED).json(serializeBigInt(tutors));
});

export const update = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const body = updateTutorsSchema.parse(req.body);
    const tutors = await tutorsService.update(id, body);
    res.status(HTTPCODES.OK).json(serializeBigInt(tutors));
});

export const deleteById = asyncHandler(async(req: Request, res: Response)=> {
    const { id } = req.params;
    const tutors = await tutorsService.deleteById(id);
    res.status(HTTPCODES.NOCONTENT).json(serializeBigInt(tutors));
});