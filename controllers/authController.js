const { User } = require('../models'); // Usar dos puntos (..) para salir de la carpeta controllers
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// controllers/authController.js
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Forzar el rol a 'usuario' por seguridad
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role: 'usuario' // Ningún usuario puede auto-asignarse rol 'administrador'
    });

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};