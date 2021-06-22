import { Body } from "../../../components/productsInventory/productDefinitions/manage/Body";
import {updateTabsSiteName} from "../../../redux/actions/navigation.js";
import {useDispatch} from "react-redux";
import React, { useEffect } from "react";

export const Manage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    updateTabsSiteName("Administrar definiciones de productos")(dispatch);
  }, []);

  return (
    <>
      <Body></Body>
    </>
  );
};
