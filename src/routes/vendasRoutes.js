import { Router } from 'express';
import { authPrivate } from '../middlewares/Auth.js';
import { delProduto, mudarVenda, novaVenda, pegarProdutos, todasVendas } from '../controllers/VendasController.js';

const router = Router();

// router.post('/ads/add', authPrivate, create);
// router.get('/ads/list', getList);
// router.get('/ad/:id', getItem);
// Enviando imagens, será POST
// router.post('/ad/:id', authPrivate, update);

// Categories
router.get('/produtos', pegarProdutos);
router.get('/vendas', todasVendas);
router.post('/venda/add', novaVenda);
router.delete('/deletarvenda/:id', delProduto);
router.put('/aumentarvenda/:id', mudarVenda);


export default router;