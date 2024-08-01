const { v4: uuidv4 } = require('uuid');
const casual = require('casual');
const { getRandomInt, getRandomIntInclusive } = require('../helpers');

const types = ['Nike', 'Adidas', 'Vans', 'All Stars', 'Airmax'];

const createProduct = () => {
    const type = types[getRandomInt(types.length)];

    return {
        id: uuidv4(),
        name: `Nike ${type} ${getRandomIntInclusive(0, 1000)}`,
        price: getRandomIntInclusive(5, 1000),
        image: [
            'https://github.com/user-attachments/assets/fabd0a64-146d-4d8b-a4f1-ec2062cad620',
            'https://github.com/user-attachments/assets/2279bb8e-c59a-499f-8b79-e9410c13e22d',
            'https://github.com/user-attachments/assets/c95ffe96-1617-4e43-b2be-d00b031f742c',
            'https://github.com/user-attachments/assets/ee481906-fc98-42eb-b715-1c33b3b6b3e4'
        ],
        colors: ['ff0000', '006CFF', '171717'],
        description: casual.description,
        category: casual.country_code,
        size: ['S', 'M', 'L'],
        type
    };
};

const mockProducts = Array.from({ length: 100 }, createProduct);

module.exports = mockProducts;
