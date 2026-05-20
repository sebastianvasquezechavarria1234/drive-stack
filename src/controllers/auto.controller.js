/**
 * Controladores para las operaciones CRUD de autos (Asíncronos)
 */
import * as db from "../utils/db.js";
import { filterAutos } from "../utils/filter.js";

export const getAllAutos = async (req, res, next) => {
    try {
        const data = await db.readData();
        const autos = filterAutos(data.autos, req.query);
        res.json(autos);
    } catch (error) {
        next(error);
    }
};

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
