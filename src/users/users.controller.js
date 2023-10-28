
import User from './users.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Verifica si ya existe un usuario con el mismo Email
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Ya existe un usuario con el mismo Email' });
        }

        // Crea un nuevo usuario en la base de datos
        const newUser = await User.create({ name, email, password, role });

        // En este punto, newUser.id contiene el ID del usuario recién creado
        // Puedes usar newUser.id para realizar peticiones adicionales relacionadas con este usuario

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserInfo = async (req, res) => {
    try {
        // Suponemos que el usuario se autentica y su información está disponible en req.user
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Aquí puedes seleccionar los campos que desees devolver en la respuesta
        const userInfo = {
            name: user.name,
            email: user.email,
            role: user.role,
            // Otros campos que quieras incluir
        };

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deshabilitar la cuenta de un usuario (cambiar status a disabled)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.status = 'disabled';

        await user.save();
        res.status(200).json({ message: 'Cuenta de usuario deshabilitada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




