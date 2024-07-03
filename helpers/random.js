const getRandomInt = max => {
    return Math.floor(Math.random() * max);
};

const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(
        Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );
};

module.exports = { getRandomInt, getRandomIntInclusive };
