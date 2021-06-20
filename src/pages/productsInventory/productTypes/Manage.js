import { MainMenu } from "../../../components/MainMenu";
import { Tabs } from "../../../components/productsInventory/Tabs";
import { Body } from "../../../components/productsInventory/productTypes/manage/Body";
import React from "react";

export const Manage = () => {
  return (
    <>
      <div className="p-grid p-d-flex p-ai-center p-jc-between p-mb-2">
        <div className="p-ml-2">
          <MainMenu
            moduleName="Inventario de productos"
            iconName="pi-th-large"
          ></MainMenu>
        </div>
        <div className="p-col">
          <Tabs siteName="Administración de tipos de producto"></Tabs>
        </div>
      </div>
      <Body></Body>
    </>
  );
};
