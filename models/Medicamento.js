const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcionMed: { type: DataTypes.STRING(150), allowNull: false },
  fechaFabricacion: { type: DataTypes.DATEONLY },
  fechaVencimiento: { type: DataTypes.DATEONLY },
  Presentacion: { type: DataTypes.STRING(50) },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  precioVentaUni: { type: DataTypes.DECIMAL(10, 2) },
  precioVentaPres: { type: DataTypes.DECIMAL(10, 2) },
  Marca: { type: DataTypes.STRING(50) }
}, { freezeTableName: true, timestamps: false });

module.exports = Medicamento; 