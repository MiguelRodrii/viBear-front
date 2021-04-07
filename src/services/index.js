import {GraphQLClient } from 'graphql-request'


// ... or create a GraphQL client instance to send requests
const API = new GraphQLClient(process.env.REACT_APP_URL_API, { headers: {} });

export default API;