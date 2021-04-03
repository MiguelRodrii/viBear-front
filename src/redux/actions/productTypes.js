import * as productTypes from "./types/productTypes";
import API from "../../services";
import { gql } from 'graphql-request';

export const getProductTypes = () => async dispatch => {
    try {
        dispatch({
            type: productTypes.GET_PRODUCT_TYPES_LOADING,
            payload: {loading: true}
        });
        const response = await API.request(gql`
        query {
            productTypes {
              id,
              name,
              is_expirable
            }
        }
        `);
        console.log(response.productTypes);
    } catch (error) {
        console.log("oh, no");
    }    
};