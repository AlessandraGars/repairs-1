import express from 'express';
import { createRepairs, deleteRepairs, getRepairById, getRepairs, updateRepairsStatus } from './repairs.controller.js';

export const router = express.Router();

router.get("/", getRepairs);            // Obtener la lista de motos pendientes (pending) de reparar
router.get("/:id", getRepairById);       // Obtener una moto pendiente de reparar por su id
router.post("/", createRepairs);        // Crear una cita
router.patch("/:id", updateRepairsStatus); // Actualizar el status de una reparación a completado
router.delete("/:id", deleteRepairs);    // Cancelar la reparación de un usuario
