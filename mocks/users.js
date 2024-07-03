const { v4: uuidv4 } = require('uuid');

const mockUsers = [
    {
        id: uuidv4(),
        name: 'Anh Nguyen',
        avatar: '/images/anh.png',
        userName: 'anh.nguyen'
    },
    {
        id: uuidv4(),
        name: 'Minh Dinh',
        avatar: '/images/minh.png',
        userName: 'minh.dinh'
    },
    {
        id: uuidv4(),
        name: 'Do Nguyen',
        avatar: '/images/do.png',
        userName: 'do.nguyen'
    },
    {
        id: uuidv4(),
        name: 'Ngan Thai',
        avatar: '/images/ngan.png',
        userName: 'ngan.thai'
    }
];

module.exports = mockUsers;
