/**
 * Utilidades para la persistencia de datos en JSON
 */
import fs from "fs";
import path from "path";

const dbPath = path.resolve("./db.json");

export const readData = () => {
    try {
        const data = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer la base de datos:", error);
        return { autos: [] };
    }
};

export const writeData = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al escribir en la base de datos:", error);
    }
};

export const getNextId = (items) => {
    if (items.length === 0) return 1;
    const ids = items.map(item => item.id).filter(id => !isNaN(id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};
