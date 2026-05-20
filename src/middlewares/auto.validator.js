import { z } from "zod";

const autoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").trim(),
  precio: z.number().positive("El precio debe ser un número positivo"),
  categoria: z.string().min(1, "La categoría es obligatoria").trim(),
});

export const validateAuto = (req, res, next) => {
  try {
    autoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};
