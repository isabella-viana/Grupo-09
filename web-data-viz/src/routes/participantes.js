const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');

router.get('/participantes', participantesController.listar);
router.delete('/participantes', participantesController.deletar);
router.put('/participantes/:id', participantesController.editar);

module.exports = router;
