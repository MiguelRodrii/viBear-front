import { MainMenu } from "../../components/MainMenu";
import { Tabs } from "../../components/productsInventory/Tabs";

export const ProductsInventory = () => {
  return (
    <>
      <div className="p-grid p-d-flex p-ai-center p-jc-between p-mb-2">
        <div className="p-ml-2">
          <MainMenu moduleName="Inventario de productos" iconName="pi-th-large"></MainMenu>
        </div>
        <div className="p-col">
          <Tabs siteName="Página principal del módulo"></Tabs>
        </div>
      </div>
      <h1>Dashboard - Próximamente</h1>
    </>
  );
};
