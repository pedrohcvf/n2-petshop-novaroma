-- CreateEnum
CREATE TYPE "type_Enum" AS ENUM ('BATH', 'SHEAR', 'CONSULT', 'VACCINATION');

-- CreateEnum
CREATE TYPE "product_Enum" AS ENUM ('RATION', 'TOYS', 'MEDICINES');

-- CreateEnum
CREATE TYPE "state_Enum" AS ENUM ('REQUESTED', 'PROCESSING', 'PENDING', 'DONE');

-- CreateTable
CREATE TABLE "pets" (
    "id_pets" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "specie" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "fk_tutor_id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id_pets")
);

-- CreateTable
CREATE TABLE "tutors" (
    "id_tutor" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutors_pkey" PRIMARY KEY ("id_tutor")
);

-- CreateTable
CREATE TABLE "services" (
    "id_services" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL,
    "type" "type_Enum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id_services")
);

-- CreateTable
CREATE TABLE "products" (
    "id_products" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL,
    "stock" INTEGER NOT NULL,
    "products" "product_Enum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id_products")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id_appointments" BIGSERIAL NOT NULL,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "status" "state_Enum" NOT NULL DEFAULT 'REQUESTED',
    "fk_tutor_id" BIGINT NOT NULL,
    "fk_pet_id" BIGINT NOT NULL,
    "fk_service_id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id_appointments")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk_tutor_id_fkey" FOREIGN KEY ("fk_tutor_id") REFERENCES "tutors"("id_tutor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_fk_tutor_id_fkey" FOREIGN KEY ("fk_tutor_id") REFERENCES "tutors"("id_tutor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_fk_pet_id_fkey" FOREIGN KEY ("fk_pet_id") REFERENCES "pets"("id_pets") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_fk_service_id_fkey" FOREIGN KEY ("fk_service_id") REFERENCES "services"("id_services") ON DELETE RESTRICT ON UPDATE CASCADE;
