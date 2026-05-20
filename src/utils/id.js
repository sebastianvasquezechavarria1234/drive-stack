export const parseId = (value) => {
    const id = parseInt(value, 10);
    if (isNaN(id) || id < 1) return null;
    return id;
};
