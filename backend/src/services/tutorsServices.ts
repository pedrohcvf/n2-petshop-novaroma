import { z } from "zod";
import { createTutorsSchema, updateTutorsSchema } from "../schemas/tutorsSchema";
import { returnNumberedID } from "../utils/utils"
import { AppError } from "../errors/AppError";
import { HTTPCODES } from "../utils/httpCodes";
import { prisma } from "../utils/prisma";

type CreateTutorsDTO = z.infer<typeof createTutorsSchema>;
type UpdateTutorsDTO = z.infer<typeof updateTutorsSchema>;

const repository = prisma;

export async function getAll() {
    return repository.tutors.findMany();
}

export async function getById(tutorIdS: string | string[]) {
    const tutorId = returnNumberedID(tutorIdS);

    if (!tutorId) {
        throw new AppError("ID do Tutor inválido.", HTTPCODES.BADREQUEST);
    }

    const tutor = await repository.tutors.findUnique({where: {id_tutor: tutorId}});

    if (!tutor) {
        throw new AppError("Tutor não encontrado.", HTTPCODES.NOTFOUND);
    }

    return tutor;
}

export async function create(body: CreateTutorsDTO) {
    const alreadyExists = await repository.tutors.findFirst({where: {name: body.name}});

    if (alreadyExists) {
        throw new AppError("Um Tutor já existe com esse nome", HTTPCODES.BADREQUEST);
    }

    return repository.tutors.create({data: body});
}

export async function update(tutorsIdS: string | string[], body: UpdateTutorsDTO) {
    const { name } = body;
    const tutorId = returnNumberedID(tutorsIdS);

    if (!tutorId) {
        throw new AppError("ID do Tutor inválido.", HTTPCODES.BADREQUEST);
    }

    const alreadyExists = await repository.tutors.findFirst({where: {name: name}});

    if (alreadyExists && Number(alreadyExists.id_tutor) !== tutorId) {
        throw new AppError("Um Tutor já existe com esse nome", HTTPCODES.BADREQUEST);
    }

    const tutor = await repository.tutors.findUnique({where: {id_tutor: tutorId}});

    if (!tutor) {
        throw new AppError("Tutor não encontrado.", HTTPCODES.NOTFOUND);
    }

    return repository.tutors.update({where: {id_tutor: tutorId}, data: body});
}

export async function deleteById(tutorsIdS: string | string[]) {
    const tutorId = returnNumberedID(tutorsIdS);

    if (!tutorId) {
        throw new AppError("ID do Tutor inválido.", HTTPCODES.BADREQUEST);
    }

    const doesTutorExists = await repository.tutors.findUnique({where: {id_tutor: tutorId}});

    if (!doesTutorExists) {
        throw new AppError("Tutor não encontrado.", HTTPCODES.NOTFOUND);
    }

    return repository.tutors.delete({where: {id_tutor: tutorId}});
}