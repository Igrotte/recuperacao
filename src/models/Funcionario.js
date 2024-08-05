import { prisma } from "../../config/prisma.js";

export const criarFuncionario = async (data) => {
    return await prisma.funcionario.create({
        data: {
            nome: data.nome,
            email: data.email,
            passwordHash: data.passwordHash,
            telefone: data.telefone,
            nascimento: data.nascimento,
            genero: data.genero,
        },
    });
};

export const encontrarPeloEmail = async (email) => {
    try {
        return await prisma.funcionario.findUnique({
            where: {
                email: email,
            },
        });
    } catch (error) {
        throw new Error(`Falha ao achar funcionario: ${error.message}`);
    }
};

export const todosFuncionarios = async () => {
    return await prisma.funcionario.findMany({

    });
};

export const mudarTelefone = async (funcionarioId, telefone) => {
    return await prisma.funcionario.update({
        where: { id: funcionarioId },
        data: {
            telefone,
        },
    });
};


export const encontrarPeloNumero = async (telefone) => {
    return await prisma.funcionario.findFirst({
        where: { telefone },
    });
};