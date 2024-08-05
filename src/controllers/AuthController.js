import bcrypt from "bcrypt";
import { criarFuncionario, encontrarPeloEmail, mudarTelefone } from "../models/Funcionario.js";

export const signup = async (req, res) => {
  try {
    const data = req.body;
    const func = await encontrarPeloEmail(data.email);
    if (func) {
      res.status(500).json({
        error: "Email already exists!",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const telefone = await bcrypt.hash(payload, 10);


    // Criar o usuário
    await criarFuncionario(
      {
        name: data.name,
        email: data.email,
        passwordHash,
        telefone,
      },
    );

    res.status(201).json({ telefone });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const data = req.body;
    // Verificar se o email existe
    const func = await encontrarPeloEmail(data.email);
    if (!func) {
      res.status(500).json({ error: "Email or password invalid!" });
      return;
    }

    // Verificar se a senha está correta
    const match = await bcrypt.compare(data.password, func.passwordHash);
    if (!match) {
      res.status(500).json({ error: "Email or password invalid!" });
      return;
    }

    // Gerar um novo token
    const payload = (Date.now() + Math.random()).toString();
    const telefone = await bcrypt.hash(payload, 10);
    await mudarTelefone(func.id, telefone);

    // Retornar o status
    res.status(200).json({ funcId: func.id, telefone });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in", message: error.message });
  }
};