import fs from "fs/promises";
import path from "path";

const dbPath = path.resolve("./db.json");

export const readData = async () => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { autos: [] };
    }
    console.error("Corrupt database file detected:", error.message);
    return { autos: [] };
  }
};

export const writeData = async (data) => {
  if (!data || typeof data !== "object" || !Array.isArray(data.autos)) {
    throw new Error("Invalid database structure: expected { autos: [] }");
  }
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to write database file:", error.message);
    throw error;
  }
};

export const getNextId = (items) => {
  if (!items || items.length === 0) return 1;
  const ids = items.map((item) => item.id).filter((id) => !isNaN(id));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};
