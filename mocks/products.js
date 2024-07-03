const { v4: uuidv4 } = require('uuid');
const casual = require('casual');
const {
    getRandomInt,
    getRandomIntInclusive
} = require('../helpers/random');

const types = ['Nike', 'Adidas', 'Vans', 'All Stars', 'Airmax'];
const images = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png'
];

const createProduct = () => {
    const type = types[getRandomInt(types.length)];
    return {
        id: uuidv4(),
        name: `Nike ${type} ${getRandomIntInclusive(0, 1000)}`,
        price: getRandomIntInclusive(5, 1000),
        image: [
            images[getRandomInt(images.length)],
            images[getRandomInt(images.length)],
            images[getRandomInt(images.length)],
            images[getRandomInt(images.length)]
        ],
        colors: ['#ff0000', '#006CFF', '#171717'],
        description: casual.description,
        category: casual.country_code,
        size: ['S', 'M', 'L'],
        type
    };
};

const mockProducts = Array.from({ length: 100 }, createProduct);

module.exports = mockProducts;
