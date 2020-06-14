
export const getNumeric = (stringVal) => {
    if (stringVal && stringVal !== ''){
        return parseFloat(stringVal);
    }
    return 0;
}