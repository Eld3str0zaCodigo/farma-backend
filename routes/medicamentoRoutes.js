const express = require('express');
const router = express.Router();
const medCtrl = require('../controllers/medicamentoController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.get('/', verifyToken, medCtrl.getAll);
router.post('/', verifyToken, verifyRole(['administrador', 'moderador']), medCtrl.create);
router.put('/:id', verifyToken, verifyRole(['administrador', 'moderador']), medCtrl.update);
router.delete('/:id', verifyToken, verifyRole(['administrador']), medCtrl.delete);

module.exports = router;