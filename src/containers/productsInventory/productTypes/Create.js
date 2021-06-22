import { Body } from "../../../components/productsInventory/productTypes/create/Body";
import {updateTabsSiteName} from "../../../redux/actions/navigation.js";
import {useDispatch} from "react-redux";
import React, { useEffect } from "react";

export const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateTabsSiteName("Crear tipo de producto")(dispatch);
  }, []);

  return (
    <>
      <Body></Body>
    </>
  );
};
