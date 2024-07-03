const equal = (value1, value2) => {
    if (!value1) {
        return true;
    }

    return value1 === value2;
};

const arrEqual = (value, arr) => {
    if (!value) {
        return true;
    }

    return arr.some(i => i === value);
};

const between = (min, value, max) => {
    if (!max) {
        return true;
    }

    return min <= value && value <= max;
};

module.exports = { equal, arrEqual, between };
