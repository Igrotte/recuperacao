import { prisma } from "../../config/prisma.js";

export const criarProduto = async (data) => {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
        preco: data.preco,
      },
    });
  };

export const encontrarTodosProdutos = async () => {
  try {
    return await prisma.produto.findMany();
  } catch (error) {
    throw new Error(`Falha achar todos produtos ${error.message}`);
  }
};

export const acharProdutoId = async (id) => {
  try {
    return await prisma.produto.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(`Fala ao achar produto: ${error.message}`);
  }
};

export const acharProdutoNome = async (nome) => {
  try {
    return await prisma.produto.findFirst({
      where: {
        nome,
      },
    });
  } catch (error) {
    throw new Error(`Falha achar produto: ${error.message}`);
  }
};

export const mudarPreco = async (produtoId, preco) => {
    return await prisma.produto.update({
        where: { id: produtoId },
        data: {
            preco,
        },
    });
};

export const deletarProduto = async (id) => {
    return await prisma.produto.delete({
      where: {
        id,
      },
    });
  };