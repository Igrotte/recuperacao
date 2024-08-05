import { encontrarPeloNumero } from "../models/Funcionario.js";

export const authPrivate = async (req, res, next) => {
  if (!req.query.telefone && !req.body.telefone) {
    res.status(403).json({ notAllowed: true });
    return;
  }

  let telefone = "";
  if (req.query.telefone) {
    token = req.query.token;
  }
  if (req.body.telefone) {
    token = req.body.token;
  }

  if (telefone == "") {
    res.status(403).json({ notAllowed: true });
    return;
  }

  if (!encontrarPeloNumero(telefone)) {
    res.json({ notAllowed: true });
    return;
  }

  next();
};