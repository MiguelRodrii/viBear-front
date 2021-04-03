import {GraphQLClient } from 'graphql-request'


// ... or create a GraphQL client instance to send requests
const API = new GraphQLClient('http://localhost:4000/graphql', { headers: {} });

export default API;