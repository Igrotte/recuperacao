import { todosFuncionarios } from '../models/Funcionario.js';
import { encontrarPeloNumero } from '../models/Funcionario.js';

export const encontrarFunc = async (req, res) => {
  try {
    const funcionarios = await todosFuncionarios();
    res.status(200).json({ funcionarios });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get funcionarios", message: error.message });
  }
};

export const info = async (req, res) => {
  try {
    let telefone = req.body.telefone;
    if (!telefone) {
      res.status(500).json({ error: "Telefone was not provided" });
      return;
    }
    const funcionario = await encontrarPeloNumero(telefone);
    let vendasList = []; // TODO: adicionar os dados do anúncio
    res.status(200).json({
      name: funcionario.nome,
      email: funcionario.email,
      vendas: vendasList,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get info of the funcionario",
      message: error.message,
    });
  }
};