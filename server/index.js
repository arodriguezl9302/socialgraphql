const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
require('dotenv').config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 

}, (err, _) => {
    if (err) {
        console.log(err);
    } else {
        server();
    } 
});

function server () {
   const apolloServer = new ApolloServer({
       typeDefs,
       resolvers,
       //introspection: true,
   }); 

   apolloServer.listen().then(({ url }) => {
         console.log(`🚀 Server ready at ${url}`);
   })

}