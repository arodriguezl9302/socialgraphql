const userController = require('../controllers/userController');

const resolvers = {
    Query: {
        //user
        getUser: () => {
            console.log('obteniendo usuarios');
            return null;
        }
    },

    Mutation: {
        //user
        register: async (_, { input }) => userController.register(input),
        login: async (_, { input }) => userController.login(input)

    }
}

module.exports = resolvers;