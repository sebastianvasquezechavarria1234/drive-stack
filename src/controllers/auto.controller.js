/**
 * Controladores para las operaciones CRUD de autos
 */
import * as db from "../utils/db.js";

export const getAllAutos = (req, res) => {
    const data = db.readData();
    let { categoria, nombre } = req.query;
    let autos = data.autos;

    if (categoria) {
        autos = autos.filter(a => a.categoria?.toLowerCase() === categoria.toLowerCase());
    }

    if (nombre) {
        autos = autos.filter(a => a.nombre?.toLowerCase().includes(nombre.toLowerCase()));
    }

    res.json(autos);
};

export const getAutoById = (req, res) => {
    const data = db.readData();
    const id = parseInt(req.params.id);
    const auto = data.autos.find((a) => a.id === id);
    if (!auto) return res.status(404).json({ message: "Auto no encontrado" });
    res.json(auto);
};

export const createAuto = (req, res) => {
    const data = db.readData();
    const newCar = {
        id: db.getNextId(data.autos),
        ...req.body,
    };
    data.autos.push(newCar);
    db.writeData(data);
    res.status(201).json(newCar);
};

export const updateAuto = (req, res) => {
    const data = db.readData();
    const id = parseInt(req.params.id);
    const index = data.autos.findIndex((a) => a.id === id);
    if (index === -1) return res.status(404).json({ message: "Auto no encontrado" });

    data.autos[index] = { ...data.autos[index], ...req.body, id };
    db.writeData(data);
    res.json(data.autos[index]);
};

export const deleteAuto = (req, res) => {
    const data = db.readData();
    const id = parseInt(req.params.id);
    const initialLength = data.autos.length;
    data.autos = data.autos.filter((a) => a.id !== id);

    if (data.autos.length === initialLength) {
        return res.status(404).json({ message: "Auto no encontrado" });
    }

    db.writeData(data);
    res.json({ message: "El Auto fue eliminado correctamente" });
};
