import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/binary";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema";
import { returnNumberedID } from "../utils/utils"
import { AppError } from "../errors/AppError";
import { HTTPCODES } from "../utils/httpCodes";
import { prisma } from "../utils/prisma";

type CreateProductDTO = z.infer<typeof createProductSchema>;
type UpdateProductDTO = z.infer<typeof updateProductSchema>;

const repository = prisma;

export async function getAll(pageS: string = "1", limitS: string = "10") {
    const page = Number(pageS);
    const limit = Number(limitS);

    if (isNaN(page)) {
        throw new AppError("O valor enviado de Páginas é inválido.", HTTPCODES.BADREQUEST);
    }

    if (isNaN(limit)) {
        throw new AppError("O valor enviado para o Limite é inválido.", HTTPCODES.BADREQUEST);
    }

    if (page < 1 || page > 50 || limit < 1 || limit > 50) {
        throw new AppError("Páginas e Limite devem estar entre 1 e 50.", HTTPCODES.BADREQUEST);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        repository.products.findMany({
            skip,
            take: limit,
            orderBy: { id_products: "asc" },
        }),
        repository.products.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data: products,
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

export async function getById(idProductS: string | string[]) {
    const productId = returnNumberedID(idProductS);

    if (!productId) {
        throw new AppError("ID do Produto inválido.", HTTPCODES.BADREQUEST);
    }

    const product = await repository.products.findUnique({
        where: { id_products: productId },
    });

    if (!product) {
        throw new AppError("Produto não encontrado.", HTTPCODES.NOTFOUND);
    }

    return product;
}

export async function create(body: CreateProductDTO) {
    const { name, description, price, stock, product_type } = body;

    const productAlreadyExists = await repository.products.findFirst({
        where: { name },
    });

    if (productAlreadyExists) {
        throw new AppError("Produto já existe com esse nome.", HTTPCODES.BADREQUEST);
    }

    return repository.products.create({
        data: {
            name,
            description: description ? description : "",
            price: new Decimal(price),
            stock,
            product_type,
        },
    });
}

export async function update(idProductS: string | string[], body: UpdateProductDTO) {
    const { price, ...rest} = body;
    const idProduct = returnNumberedID(idProductS);

    if (!idProduct) {
        throw new AppError("ID do Produto inválido.", HTTPCODES.BADREQUEST);
    }

    const product = await repository.products.findUnique({
        where: { id_products: idProduct },
    });

    if (!product) {
        throw new AppError("Produto não encontrado.", HTTPCODES.NOTFOUND);
    }

    return repository.products.update({
        where: { id_products: idProduct },
        data: {
            ...rest,
            price: price ? new Decimal(price) : undefined,
        },
    });
}

export async function deleteById(idProductS: string | string[]) {
    const idProduct = returnNumberedID(idProductS);

    if (!idProduct) {
        throw new AppError("ID do Produto inválido.", HTTPCODES.BADREQUEST);
    }

    const product = await repository.products.findUnique({ where: { id_products: idProduct } });

    if (!product) {
        throw new AppError("Produto não encontrado.", HTTPCODES.NOTFOUND);
    }

    return repository.products.delete({where: {id_products: idProduct},});
}