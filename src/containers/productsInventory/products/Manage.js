import { Body } from "../../../components/productsInventory/products/manage/Body";
import {updateTabsSiteName} from "../../../redux/actions/navigation.js";
import {useDispatch} from "react-redux";
import React, { useEffect } from "react";
export const Manage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    updateTabsSiteName("Administrar productos")(dispatch);
  }, []);

  return (
    <>
      <Body></Body>
    </>
  );
};
