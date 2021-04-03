import { MainMenu } from "../../components/MainMenu";
import { Tabs } from "../../components/productsInventory/Tabs";

export const ProductsInventory = () => {
  return (
    <>
      <div className="p-grid p-d-flex">
        <div className="p-col-2">
          <MainMenu></MainMenu>
        </div>
        <div className="p-col-10 ">
            <Tabs></Tabs>
            <div>
              <h1>Dashboard - Próximamente</h1>
            </div>
          </div>
      </div>
    </>
  );
};
