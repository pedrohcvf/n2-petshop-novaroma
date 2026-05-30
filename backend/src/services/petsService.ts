import {z} from "zod";
import { createPetsSchema, updatePetsSchema } from "../schemas/petsSchemas";
import { prisma } from "../utils/prisma";
import { returnNumberedID } from "../utils/utils";
import { AppError } from "../errors/AppError";
import { HTTPCODES } from "../utils/httpCodes";




type CreatePetsDTO = z.infer<typeof createPetsSchema>;
type UpdatePetsDTO = z.infer<typeof updatePetsSchema>;

const repository = prisma


export async function getAll() {
    return repository.pets.findMany();
}

export async function getById(petsIds: string | string []){
    const petId = returnNumberedID(petsIds)

    if(!petId){
        throw new AppError("ID do pet inválido", HTTPCODES.BADREQUEST);
    }

    const pets = await repository.pets.findUnique({
        where: {id_pets: petId}
    })

    if(!pets){
        throw new AppError("Pet não encontrado", HTTPCODES.NOTFOUND)
    }

    return pets;

}

export async function create(body: CreatePetsDTO){
    const alreadyExists = await repository.pets.findFirst({where: {name: body.name}})

    if(alreadyExists){
        throw new AppError("Um Pet já existe com esse nome", HTTPCODES.BADREQUEST);
    }

    return repository.pets.create({data: body})
}

export async function update(petsIds: string | string [], body: UpdatePetsDTO){
    const {name} = body;
    const petId = returnNumberedID(petsIds)

    if (!petId) {
        throw new AppError("ID do Pet inválido.", HTTPCODES.BADREQUEST);
    }

    const alreadyExists = await repository.pets.findFirst({where: {name: name}})

    if (alreadyExists && Number(alreadyExists.name) !== petId) {
        throw new AppError("Um Pet já existe com esse nome", HTTPCODES.BADREQUEST);
    }

    const pet = await repository.pets.findUnique({where: {id_pets: petId}});
    
        if (!pet) {
            throw new AppError("Pet não encontrado.", HTTPCODES.NOTFOUND);
        }
    
    return repository.pets.update({
        where: {id_pets: petId},data: body
    })
}

 export async function deleteById(petsIds:string | string[]) {
        const petId = returnNumberedID(petsIds)

        if(!petId){
            throw new AppError("ID do Pet inválido",HTTPCODES.BADREQUEST)
        }

        const doesTutorExists = await repository.pets.findUnique({where: {id_pets: petId}});
        
            if (!doesTutorExists) {
                throw new AppError("Pet não encontrado.", HTTPCODES.NOTFOUND);
            }
        
            return repository.pets.delete({where: {id_pets: petId}});
    }