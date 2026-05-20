import { z } from "zod";
import {createServicoSchema, updateServicoSchema} from "../schemas/servicosSchema";
import {prisma} from "../utils/prisma";
import {returnNumberedID} from "../utils/utils";
import {AppError} from "../errors/AppError";
import {HTTPCODES} from "../utils/httpCodes";


type CreateServicosDTO = z.infer<typeof createServicoSchema>;
type UpdateServicosDto = z.infer<typeof updateServicoSchema>;

const repository = prisma;

// LISTAR TODOS OS SERVIÇOS
export async function getAll(){
    return repository.services.findMany();
}

// LISTAR SERVIÇO POR ID
export async function getById(idS: string | string []){
    const id = returnNumberedID(idS)

    if(!id){
        throw new AppError("ID do serviço inválido", HTTPCODES.BADREQUEST);
    }

    const servico = await repository.services.findUnique({where:{id_services:id}});

    if(!servico){
        throw new AppError("Serviço não encontrado", HTTPCODES.NOTFOUND);
    }

    return servico;
}

// CRIAR UM SERVIÇO
export async function create(body: CreateServicosDTO){
    const alreadyExists = await repository.services.findFirst({where:{name:body.name}});

    if (alreadyExists){
        throw new AppError("Already existe", HTTPCODES.BADREQUEST);
    }

    return repository.services.create({data: body});
}

// ATUALIZAR SERVIÇO
export async function update(idS: string | string[], body: UpdateServicosDto){
    const id = returnNumberedID(idS);

    if (!id){
        throw new AppError("ID do serviço inválido", HTTPCODES.BADREQUEST);
    }

    const servico = await repository.services.findUnique({where: {id_services:id}});

    if(!servico){
        throw new AppError("Serviço não encontrado", HTTPCODES.NOTFOUND);
    }

    if (body.name){
        const alreadyExists = await repository.services.findFirst({where:{name:body.name}});

        if (alreadyExists && Number(alreadyExists.id_services) != id){
            throw new AppError("Já existe um serviço com esse nome", HTTPCODES.BADREQUEST);
        }
    }

    return repository.services.update({where: {id_services:id}, data: body});

}

// DELETAR SERVIÇO
export async function deleteById(idS: string | string[]){
    const id = returnNumberedID(idS);

    if (!id){
        throw new AppError("ID do serviço inválido.", HTTPCODES.BADREQUEST)
    }

    const servico = await repository.services.findUnique({where: {id_services:id}});

    if(!servico){
        throw new AppError("Serviço não encontrado.", HTTPCODES.NOTFOUND);
    }

    return repository.services.delete({where: {id_services:id}});
}