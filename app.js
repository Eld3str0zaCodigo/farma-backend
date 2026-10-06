require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { sequelize, Especialidad, Medicamento, User } = require('./models');
const authRoutes = require('./routes/authRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');

// 1. Inicializar la aplicación Express
const app = express();

// 2. Middlewares principales
app.use(cors());
app.use(express.json());

// 3. Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

// 4. Sincronizar Base de Datos e Iniciar Servidor
sequelize.sync({ force: true }).then(async () => {
  console.log('Base de datos conectada y sincronizada.');

  // Crear Administrador por defecto con contraseña Hash encriptada
  const defaultPasswordHash = await bcrypt.hash('AdminSecurePass123!', 10);
  await User.findOrCreate({
    where: { email: 'admin@farmacia.com' },
    defaults: {
      username: 'admin',
      email: 'admin@farmacia.com',
      password: defaultPasswordHash,
      role: 'administrador'
    }
  });
  console.log('Usuario administrador inicial configurado con Hash.');

  // Crear especialidad y medicamento de prueba (Semilla)
  const esp = await Especialidad.create({ descripcionEsp: 'Pediatría' });
  await Medicamento.create({
    descripcionMed: 'Paracetamol 500mg',
    stock: 100,
    precioVentaUni: 1.50,
    CodEspec: esp.CodEspec
  });
  console.log('Datos iniciales de medicamentos insertados.');

  // Iniciar servidor escuchando en el puerto
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor activo corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});
