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

export const getExpirationDates = () => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.GET_EXPIRATION_DATES_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      query {
        expirationDates {
          id
          value
          product {
            id
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.GET_EXPIRATION_DATES_SUCCESS,
      payload: {
        loading: false,
        success: true,
        expirationDates: response.expirationDates,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.GET_EXPIRATION_DATES_SUCCESS,
      payload: {
        loading: false,
        success: false,
      },
    });
  }
};

export const deleteExpirationDate = (expirationDateId) => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.DELETE_EXPIRATION_DATE_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        deleteExpirationDate(id: ${expirationDateId})
      }
    `);
    if (response.deleteExpirationDate) {
      dispatch({
        type: groupTypes.DELETE_EXPIRATION_DATE_SUCCESS,
        payload: {
          loading: false,
          success: true,
          deletedExpirationDateId: expirationDateId,
        },
      });
      return true;
    }
    dispatch({
      type: groupTypes.DELETE_EXPIRATION_DATE_FAILED,
      payload: { loading: false, success: false },
    });
    return false;
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.DELETE_EXPIRATION_DATE_FAILED,
      payload: { loading: false, success: false },
    });
    return false;
  }
};

export const updateExpirationDate = (id, value) => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.UPDATE_EXPIRATION_DATE_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        updateExpirationDate(expirationDate: { id: ${id}, value: "${value}"}) {
          id
          value
          product {
            id
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.UPDATE_EXPIRATION_DATE_SUCCESS,
      payload: {
        loading: false,
        success: true,
        updatedExpirationDate: response.updateExpirationDate,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.UPDATE_EXPIRATION_DATE_FAILED,
      payload: {
        loading: false,
        success: false,
      },
    });
    return true;
  }
};
