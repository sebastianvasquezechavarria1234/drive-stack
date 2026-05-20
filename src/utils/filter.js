export const filterAutos = (autos, { categoria, nombre }) => {
    let result = autos;

    if (categoria) {
        result = result.filter(a => a.categoria?.toLowerCase() === categoria.toLowerCase());
    }

    if (nombre) {
        result = result.filter(a => a.nombre?.toLowerCase().includes(nombre.toLowerCase()));
    }

    return result;
};
