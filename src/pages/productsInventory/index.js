import { MainMenu } from "../../components/MainMenu";
import { Tabs } from "../../components/productsInventory/Tabs";

export const ProductsInventory = () => {
  return (
    <>
      <div className="p-grid p-d-flex p-ai-center">
        <div className="p-col-2">
          <MainMenu moduleName="Inventario de productos" iconName="pi-th-large"></MainMenu>
        </div>
        <div className="p-col-10 ">
          <Tabs siteName="Página principal del módulo"></Tabs>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col">
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
};
