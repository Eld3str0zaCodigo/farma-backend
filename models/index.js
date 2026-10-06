const sequelize = require('../config/database');
const User = require('./User');
const Especialidad = require('./Especialidad');
const Medicamento = require('./Medicamento');

// Relación 1 a Muchos: Una Especialidad tiene muchos Medicamentos
Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec' });

module.exports = { sequelize, User, Especialidad, Medicamento };