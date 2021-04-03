import { MainMenu } from "../../../components/MainMenu";
import { Tabs } from "../../../components/productsInventory/Tabs";
import { Body } from "../../../components/productsInventory/productTypes/createProductType/Body";
export const CreateProductType = () => {
  return (
    <>
      <div className="p-grid p-d-flex">
        <div className="p-col-2">
          <MainMenu></MainMenu>
        </div>
        <div className="p-col-10 ">
          <Tabs siteName="Creación de tipo de producto"></Tabs>
          <div className="p-col p-d-none p-d-md-inline">
            <Body></Body>
          </div>
        </div>
        <div className="p-d-md-none p-col">
          <Body></Body>
        </div>
      </div>
    </>
  );
};
