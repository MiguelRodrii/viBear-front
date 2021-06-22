import { Body } from "../../../components/productsInventory/products/create/Body";
import {updateTabsSiteName} from "../../../redux/actions/navigation.js";
import {useDispatch} from "react-redux";
import React, { useEffect } from "react";

export const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateTabsSiteName("Crear producto")(dispatch);
  }, []);

  return (
    <>
      <Body></Body>
    </>
  );
};
