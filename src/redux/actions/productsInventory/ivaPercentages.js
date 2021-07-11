import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "../../constants/productsInventory/ivaPercentages.js";

export const getIvaPercentages = () => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.GET_IVA_PERCENTAGES_LOADING,
      payload: { loading: true },
    });

    const response = await API.request(gql`
      query {
        ivaPercentages {
          id
          value
        }
      }
    `);
    dispatch({
      type: groupTypes.GET_IVA_PERCENTAGES_SUCCESS,
      payload: {
        loading: false,
        success: true,
        ivaPercentages: response.ivaPercentages,
      },
    });
  } catch (error) {
    dispatch({
      type: groupTypes.GET_IVA_PERCENTAGES_FAILED,
      payload: {
        loading: false,
        success: false,
      },
    });
    if (error.response === undefined) {
      console.log(error);
      return;
    }
    if (error.response.errors[0].message.body === undefined) {
      console.log(error);
      console.log(error.response);
      return;
    }
    throw new Error(error.response.errors[0].message.body.nontechnical);
  }
};