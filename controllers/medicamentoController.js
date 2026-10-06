const { Medicamento, Especialidad } = require('../models'); // Usar dos puntos (..)

// Obtener todos los medicamentos con su especialidad
exports.getAll = async (req, res) => {
  try {
    const items = await Medicamento.findAll({ include: Especialidad });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Crear Medicamento
exports.create = async (req, res) => {
  try {
    const item = await Medicamento.create(req.body);
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Actualizar Medicamento
exports.update = async (req, res) => {
  try {
    await Medicamento.update(req.body, { where: { CodMedicamento: req.params.id } });
    res.json({ message: 'Medicamento actualizado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Eliminar Medicamento
exports.delete = async (req, res) => {
  try {
    await Medicamento.destroy({ where: { CodMedicamento: req.params.id } });
    res.json({ message: 'Medicamento eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};