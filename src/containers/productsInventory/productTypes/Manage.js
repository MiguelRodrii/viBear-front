import { Body } from "../../../components/productsInventory/productTypes/manage/Body";
import React, { useEffect } from "react";
import { updateTabsSiteName } from "../../../redux/actions/navigation.js";
import { useDispatch } from "react-redux";

export const Manage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateTabsSiteName("Administrar tipos de productos")(dispatch);
  }, []);

  return (
    <>
      <Body></Body>
    </>
  );
};
