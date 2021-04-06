import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "./types/expirationDates";

export const createExpirationDate = (expirationDate, productId) => async (
  dispatch
) => {
  try {
    dispatch({
      type: groupTypes.CREATE_EXPIRATION_DATE_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        createExpirationDate(
          expirationDate: { value: "${expirationDate.toDateString()}", product_id: ${productId} }
        ) {
          id
        }
      }
    `);
    dispatch({
      type: groupTypes.CREATE_EXPIRATION_DATE_SUCCESS,
      payload: { loading: false, success: true },
    });
    return response.createExpirationDate.id;
  } catch (error) {
      console.log(error);
      dispatch({
        type: groupTypes.CREATE_EXPIRATION_DATE_FAILED,
        payload: { loading: false, success: false },
      });
      return undefined;
  }
};
