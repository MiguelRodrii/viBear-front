import {GraphQLClient } from 'graphql-request'


// ... or create a GraphQL client instance to send requests
const API = new GraphQLClient('http://192.168.100.10:4000/graphql', { headers: {} });

export default API;