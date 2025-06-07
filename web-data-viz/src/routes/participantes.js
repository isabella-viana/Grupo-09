const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');

router.get("/listar", function (req, res) {
    participantesController.listar(req, res);
    console.log('Chegou no router de participantes')
})

router.delete('/:id', participantesController.deletar);
router.put('/:id', participantesController.editar);


module.exports = router;
