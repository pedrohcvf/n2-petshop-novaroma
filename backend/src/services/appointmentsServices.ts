import { z } from "zod";
import { createAppointmentsSchema, updateAppointmentsSchema } from "../schemas/appointmentsSchema";
import { returnNumberedID } from "../utils/utils";
import { AppError } from "../errors/AppError";
import { HTTPCODES } from "../utils/httpCodes";
import { prisma } from "../utils/prisma";

type CreateAppointmentDTO = z.infer<typeof createAppointmentsSchema>;
type UpdateAppointmentDTO = z.infer<typeof updateAppointmentsSchema>;

const repository = prisma;

export async function getAll(
  pageS: string = "1",
  limitS: string = "10"
) {
  const page = Number(pageS);
  const limit = Number(limitS);

  if (isNaN(page)) {
    throw new AppError(
      "O valor enviado de Página é inválido.",
      HTTPCODES.BADREQUEST
    );
  }

  if (isNaN(limit)) {
    throw new AppError(
      "O valor enviado de Limite é inválido.",
      HTTPCODES.BADREQUEST
    );
  }

  if (page < 1 || page > 50 || limit < 1 || limit > 50) {
    throw new AppError(
      "Página e Limite devem estar entre 1 e 50.",
      HTTPCODES.BADREQUEST
    );
  }

  const skip = (page - 1) * limit;

  const [appointments, total] = await Promise.all([
    repository.appointments.findMany({
      skip,
      take: limit,
      orderBy: {
        scheduled_date: "asc",
      },
      include: {
        tutor: true,
        pet: true,
        service: true,
      },
    }),
    repository.appointments.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: appointments,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function getById(idAppointmentS: string | string[]) {
  const appointmentId = returnNumberedID(idAppointmentS);

  if (!appointmentId) {
    throw new AppError(
      "ID do agendamento inválido.",
      HTTPCODES.BADREQUEST
    );
  }

  const appointment = await repository.appointments.findUnique({
    where: {
      id_appointments: appointmentId,
    },
    include: {
      tutor: true,
      pet: true,
      service: true,
    },
  });

  if (!appointment) {
    throw new AppError(
      "Agendamento não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  return appointment;
}

export async function create(body: CreateAppointmentDTO) {
  const {
    scheduled_date,
    status,
    fk_tutor_id,
    fk_pet_id,
    fk_service_id,
  } = body;

  const tutor = await repository.tutors.findUnique({
    where: {
      id_tutor: BigInt(fk_tutor_id),
    },
  });

  if (!tutor) {
    throw new AppError(
      "Tutor não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  const pet = await repository.pets.findUnique({
    where: {
      id_pets: BigInt(fk_pet_id),
    },
  });

  if (!pet) {
    throw new AppError(
      "Pet não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  const service = await repository.services.findUnique({
    where: {
      id_services: BigInt(fk_service_id),
    },
  });

  if (!service) {
    throw new AppError(
      "Serviço não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  if (pet.fk_tutor_id !== BigInt(fk_tutor_id)) {
    throw new AppError(
      "O pet não pertence ao tutor informado.",
      HTTPCODES.BADREQUEST
    );
  }

  const conflictingAppointment =
    await repository.appointments.findFirst({
      where: {
        scheduled_date: scheduled_date,
      },
    });

  if (conflictingAppointment) {
    throw new AppError(
      "Já existe um agendamento para este horário.",
      HTTPCODES.BADREQUEST
    );
  }

  return repository.appointments.create({
    data: {
      scheduled_date,
      status,
      fk_tutor_id: BigInt(fk_tutor_id),
      fk_pet_id: BigInt(fk_pet_id),
      fk_service_id: BigInt(fk_service_id),
    },
  });
}

export async function update(
  idAppointmentS: string | string[],
  body: UpdateAppointmentDTO
) {
  const appointmentId = returnNumberedID(idAppointmentS);

  if (!appointmentId) {
    throw new AppError(
      "ID do agendamento inválido.",
      HTTPCODES.BADREQUEST
    );
  }

  const appointment =
    await repository.appointments.findUnique({
      where: {
        id_appointments: appointmentId,
      },
    });

  if (!appointment) {
    throw new AppError(
      "Agendamento não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  if (body.fk_tutor_id) {
    const tutor = await repository.tutors.findUnique({
      where: {
        id_tutor: BigInt(body.fk_tutor_id),
      },
    });

    if (!tutor) {
      throw new AppError(
        "Tutor não encontrado.",
        HTTPCODES.NOTFOUND
      );
    }
  }

  if (body.fk_pet_id) {
    const pet = await repository.pets.findUnique({
      where: {
        id_pets: BigInt(body.fk_pet_id),
      },
    });

    if (!pet) {
      throw new AppError(
        "Pet não encontrado.",
        HTTPCODES.NOTFOUND
      );
    }
  }

  if (body.fk_service_id) {
    const service = await repository.services.findUnique({
      where: {
        id_services: BigInt(body.fk_service_id),
      },
    });

    if (!service) {
      throw new AppError(
        "Serviço não encontrado.",
        HTTPCODES.NOTFOUND
      );
    }
  }

  if (body.scheduled_date) {
    const conflict =
      await repository.appointments.findFirst({
        where: {
          scheduled_date: body.scheduled_date,
          NOT: {
            id_appointments: appointmentId,
          },
        },
      });

    if (conflict) {
      throw new AppError(
        "Já existe um agendamento para este horário.",
        HTTPCODES.BADREQUEST
      );
    }
  }

  return repository.appointments.update({
    where: {
      id_appointments: appointmentId,
    },
    data: {
      ...body,
      fk_tutor_id: body.fk_tutor_id
        ? BigInt(body.fk_tutor_id)
        : undefined,
      fk_pet_id: body.fk_pet_id
        ? BigInt(body.fk_pet_id)
        : undefined,
      fk_service_id: body.fk_service_id
        ? BigInt(body.fk_service_id)
        : undefined,
    },
  });
}

export async function deleteById(
  idAppointmentS: string | string[]
) {
  const appointmentId = returnNumberedID(idAppointmentS);

  if (!appointmentId) {
    throw new AppError(
      "ID do agendamento inválido.",
      HTTPCODES.BADREQUEST
    );
  }

  const appointment =
    await repository.appointments.findUnique({
      where: {
        id_appointments: appointmentId,
      },
    });

  if (!appointment) {
    throw new AppError(
      "Agendamento não encontrado.",
      HTTPCODES.NOTFOUND
    );
  }

  return repository.appointments.delete({
    where: {
      id_appointments: appointmentId,
    },
  });
}