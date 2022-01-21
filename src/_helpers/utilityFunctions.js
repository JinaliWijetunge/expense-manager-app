export const validArray = (array) => {

    let arrayValidation = Array.isArray(array) && array.length !== 0 && array;

    return arrayValidation
}