/**
 * Controladores para las operaciones CRUD de autos (Asíncronos)
 */
import * as db from "../utils/db.js";

/**
 * Retrieves all autos with optional filters by categoria and nombre.
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */
export const getAllAutos = async (req, res, next) => {
    try {
        const data = await db.readData();
        let { categoria, nombre } = req.query;
        let autos = data.autos;

        if (categoria) {
            autos = autos.filter(a => a.categoria?.toLowerCase() === categoria.toLowerCase());
        }

        if (nombre) {
            autos = autos.filter(a => a.nombre?.toLowerCase().includes(nombre.toLowerCase()));
        }

        res.json(autos);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single auto by its ID.
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */
export const getAutoById = async (req, res, next) => {
    try {
        const data = await db.readData();
        const id = parseInt(req.params.id);
        const auto = data.autos.find((a) => a.id === id);
        if (!auto) return res.status(404).json({ message: "Auto no encontrado" });
        res.json(auto);
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new auto entry.
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */
export const createAuto = async (req, res, next) => {
    try {
        const data = await db.readData();
        const newCar = {
            id: db.getNextId(data.autos),
            ...req.body,
        };
        data.autos.push(newCar);
        await db.writeData(data);
        res.status(201).json(newCar);
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing auto by ID.
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */
export const updateAuto = async (req, res, next) => {
    try {
        const data = await db.readData();
        const id = parseInt(req.params.id);
        const index = data.autos.findIndex((a) => a.id === id);
        if (index === -1) return res.status(404).json({ message: "Auto no encontrado" });

        data.autos[index] = { ...data.autos[index], ...req.body, id };
        await db.writeData(data);
        res.json(data.autos[index]);
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an auto by ID.
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */
export const deleteAuto = async (req, res, next) => {
    try {
        const data = await db.readData();
        const id = parseInt(req.params.id);
        const initialLength = data.autos.length;
        data.autos = data.autos.filter((a) => a.id !== id);

        if (data.autos.length === initialLength) {
            return res.status(404).json({ message: "Auto no encontrado" });
        }

        await db.writeData(data);
        res.json({ message: "El Auto fue eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
