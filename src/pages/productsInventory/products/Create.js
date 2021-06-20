import { MainMenu } from "../../../components/MainMenu";
import { Tabs } from "../../../components/productsInventory/Tabs";
import { Body } from "../../../components/productsInventory/products/create/Body";
import React from "react";

export const Create = () => {
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
          <Tabs siteName="Creación de productos"></Tabs>
        </div>
      </div>
      <Body></Body>
    </>
  );
};
