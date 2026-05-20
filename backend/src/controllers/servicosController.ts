import { Request, Response } from "express";
import { createServicoSchema, updateServicoSchema } from "../schemas/servicosSchema";
import { serializeBigInt } from "../utils/utils";
import { asyncHandler } from "../middlewares/asyncHandler";
import { HTTPCODES } from "../utils/httpCodes";
import * as servicosService from "../services/servicosService";

// LISTAR TODOS OS SERVIÇOS
export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const servicos = await servicosService.getAll();
    res.status(HTTPCODES.OK).json(serializeBigInt(servicos));
})

// LISTAR SERVIÇO POR ID
export const getById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const servico = await servicosService.getById(id);
    res.status(HTTPCODES.OK).json(serializeBigInt(servico));
})

// CRIAR SERVIÇO
export const create = asyncHandler(async (req: Request, res: Response) => {
    const body = createServicoSchema.parse(req.body);
    const servico = await servicosService.create(body);
    res.status(HTTPCODES.CREATED).json(serializeBigInt(servico));
})

// ATUALIZAR SERVIÇO
export const update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = updateServicoSchema.parse(req.body);
    const servico = await servicosService.update(id, body);
    res.status(HTTPCODES.OK).json(serializeBigInt(servico));
})

// DELETAR SERVIÇO
export const deleteById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await servicosService.deleteById(id);
    res.status(HTTPCODES.NOCONTENT).send();
});