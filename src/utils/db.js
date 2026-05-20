/**
 * Utilidades para la persistencia de datos en JSON (Asíncrono)
 */
import fs from "fs/promises";
import path from "path";

const dbPath = path.resolve("./db.json");

export const readData = async () => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer la base de datos:", error);
    return { autos: [] };
  }
};

export const writeData = async (data) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al escribir en la base de datos:", error);
    throw error; // Re-throw to handle in controller
  }
};

export const getNextId = (items) => {
  if (!items || items.length === 0) return 1;
  const ids = items.map((item) => item.id).filter((id) => !isNaN(id));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};
