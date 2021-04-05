import { MainMenu } from "../../../components/MainMenu";
import { Tabs } from "../../../components/productsInventory/Tabs";
import {Body} from "../../../components/productsInventory/productTypes/manageProductTypes/Body";

export const ManageProductTypes = () => {
  return (
    <>
      <div className="p-grid p-d-flex p-ai-center">
        <div className="p-col-2">
          <MainMenu
            moduleName="Inventario de productos"
            iconName="pi-th-large"
          ></MainMenu>
        </div>
        <div className="p-col-10 ">
          <Tabs siteName="Administración de tipos de producto"></Tabs>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col p-d-inline">
            <Body></Body>
        </div>
      </div>
    </>
  );
};
