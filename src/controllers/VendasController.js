import { deletarProduto, encontrarTodosProdutos } from "../models/Produto.js";
import { criarVenda, encontrarTodasVendas } from "../models/Vendas.js";

export const pegarProdutos = async (req, res) => {
  try {
    const bdProdutos = await encontrarTodosProdutos();
    let produtos = [];
    for (let i in bdProdutos) {
      produtos.push({
        ...bdProdutos[i]
      });
    }
    
    return res.status(200).json({ produtos });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get produtos", message: error.message });
  }
};

export const delProduto = async (req, res) => {
  try {
    const { id } = req.params ;

    const produtoDeletado = await deletarProduto(parseInt(id));

    if (!produtoDeletado) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json({ message: 'Produto deletado com sucesso' });

  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete produto", message: error.message });
  }
}

export const novaVenda = async (req, res) => {
  try {
    const { quantidade, produtoId, funcionarioId } = req.body;

    const novaVenda = await criarVenda({ quantidade }, produtoId, funcionarioId);

    return res.status(201).json({ message: 'Venda criada com sucesso', venda: novaVenda });
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const todasVendas = async (req, res) => {
  try {
    const bdVendas = await encontrarTodasVendas();
    let vendas = [];
    for (let i in bdVendas){
      vendas.push({
        ...bdVendas[i]
      })
    }

    return res.status(200).json({ vendas });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get vendas", message: error.message });
  }
}

export const mudarVenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    await aumentarVendas(parseInt(id), parseInt(quantidade))

    return res.status(200).json({ vendas });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed ao mudar vendas", message: error.message });
  }
}