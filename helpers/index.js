const store = require('store2');

const max = ({ data, prop }) => Math.max(...data.map(o => o[prop]));

const paginate = (array, pageSize, pageNumber) => {
    return array.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
    );
};

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

const create = (key, value) => {
    const data = store(key);

    if (!data) {
        store(key, value);
    }
};

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

const covertArrayToSumObject = ({ data, prop, valueProp }) => {
    return data.reduce((obj, item) => {
        const key = item[prop];
        const oldItem = obj[key] || {};
        const oldValue = oldItem[valueProp] || 0;
        const oldCount = oldItem.count || 0;
        const newValue = item[valueProp];

        obj[key] = {
            [valueProp]: oldValue + newValue,
            count: oldCount + 1
        };

        return obj;
    }, {});
};

const covertArrayToCountObject = ({ data, prop }) => {
    return data.reduce((obj, item) => {
        const key = item[prop];
        const oldItem = obj[key] || {};
        const oldCount = oldItem.count || 0;

        obj[key] = {
            [prop]: key,
            count: oldCount + 1
        };

        return obj;
    }, {});
};

const covertArrayToObject = ({ data, prop }) => {
    return data.reduce((obj, item) => {
        const key = item[prop];

        obj[key] = key;

        return obj;
    }, {});
};

const buildProductsAverageRating = (data, array) => {
    return data.map(item => {
        const review = array[item.id] || {
            rating: 0,
            count: 0
        };
        const rating = Math.round(review.rating / review.count) || 0;

        return {
            ...item,
            aveRating: rating,
            reviewCount: review.count
        };
    });
};

const filterProductsByQueryData = ({
    data,
    type,
    color,
    minPrice,
    maxPrice
}) => {
    return data.filter(item => {
        return (
            between(minPrice, item.price, maxPrice) &&
            equal(type, item.type) &&
            arrEqual(color, item.colors)
        );
    });
};

module.exports = {
    max,
    paginate,
    equal,
    arrEqual,
    between,
    create,
    getRandomInt,
    getRandomIntInclusive,
    covertArrayToObject,
    covertArrayToSumObject,
    covertArrayToCountObject,
    buildProductsAverageRating,
    filterProductsByQueryData
};
