const { v4: uuidv4 } = require('uuid');

const mockUsers = [
    {
        id: uuidv4(),
        name: 'Anh Nguyen',
        avatar: 'https://github.com/user-attachments/assets/a6b92232-6256-4894-adb8-78db03904281',
        userName: 'anh.nguyen'
    },
    {
        id: uuidv4(),
        name: 'Minh Dinh',
        avatar: 'https://github.com/user-attachments/assets/a6b92232-6256-4894-adb8-78db03904281',
        userName: 'minh.dinh'
    },
    {
        id: uuidv4(),
        name: 'Do Nguyen',
        avatar: 'https://github.com/user-attachments/assets/f3bf0119-8057-45e1-bb61-41be8e184905',
        userName: 'do.nguyen'
    },
    {
        id: uuidv4(),
        name: 'Ngan Thai',
        avatar: 'https://github.com/user-attachments/assets/a6b92232-6256-4894-adb8-78db03904281',
        userName: 'ngan.thai'
    }
];

module.exports = mockUsers;
