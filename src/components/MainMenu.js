import { PanelMenu } from "primereact/panelmenu";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

export const MainMenu = () => {
  const menu = useRef(null);
  const history = useHistory();

  const handleCreateProductType = () => {
    history.push("/productsInventory");
  };

  const items = [
    {
      label: "Inventario de productos",
      icon: "pi pi-fw pi-th-large",
      command: handleCreateProductType
    }
  ];

  return (
    <div>
      <div className="card">
        <PanelMenu model={items} className="p-d-none p-d-md-inline-flex" />
        <Menu model={items} popup ref={menu} className="p-mt-2"/>
        <Button
          icon="pi pi-bars"
          onClick={(event) => menu.current.toggle(event)}
          className="p-d-md-none p-mt-2"
        />
      </div>
    </div>
  );
};
