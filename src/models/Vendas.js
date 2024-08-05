import { prisma } from "../../config/prisma.js";

export const criarVenda = async (data, produtoId, funcionarioId) => {
    return await prisma.vendas.create({
        data: {
            quantidade: data.quantidade,
            produto: {
                connect: {
                    id: produtoId,
                },
            },
            funcionario: {
                connect: {
                    id: funcionarioId,
                },
            },
        },
    });
};

export const encontrarTodasVendas = async () => {
    try {
        return await prisma.vendas.findMany(
            {
                include: {produto: true, funcionario: true},
            }
        );
    } catch (error) {
        throw new Error(`Falha achar todos vendas ${error.message}`);
    }
};

export const acharVendaId = async (id) => {
    try {
        return await prisma.vendas.findUnique({
            where: {
                id,
            },
            include: {produto: true, funcionario: true},
        });
    } catch (error) {
        throw new Error(`Fala ao achar vendas: ${error.message}`);
    }
};

export const acharVendaVendedorProduto = async (funcionarioId, produtoId) => {
    try {
        return await prisma.vendas.findFirst({
            where: {
                funcionarioId,
                produtoId,
            },
            include: {produto: true, funcionario: true},
        });
    } catch (error) {
        throw new Error(`Falha achar produto: ${error.message}`);
    }
};

export const aumentarVendas = async (id, quantidade) => {
    return await prisma.vendas.update({
        where: { id },
        data: {
            vendas: vendas + quantidade,
        },
    });
};