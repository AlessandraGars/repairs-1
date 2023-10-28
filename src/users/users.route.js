import express from 'express';
import { createUser, updateUser, deleteUser, getUserById, getUsers } from './users.controller.js';

export const userRouter = express.Router();

userRouter.get("/", getUsers);          // Obtener la lista de usuarios en la base de datos
userRouter.get("/:id", getUserById);     // Obtener un solo usuario dado un id
userRouter.post("/register", createUser);  // Crear un nuevo usuario
userRouter.patch("/:id", updateUser);    // Actualizar los datos de un usuario dado un id, solo puede actualizar su name y email
userRouter.delete("/:id", deleteUser);   // Deshabilitar la cuenta de un usuario, cambiar status a disabled
