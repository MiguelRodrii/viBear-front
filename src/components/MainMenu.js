import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux"

export const MainMenu = () => {
  const menu = useRef(null);
  const history = useHistory();
  const { mainMenu } = useSelector((state) => state.navigation);

  const items = [
    {
      label: "Inventario de productos",
      icon: "pi pi-fw pi-th-large",
      command: () => { history.push(`/productsInventory`)},
    },
  ];

  return (
    <div className="p-fluid">
      <Button
        icon={`pi ${mainMenu.iconName}`}
        onClick={(event) => menu.current.toggle(event)}
        className="p-d-none p-d-md-inline-flex"
        label={`${mainMenu.moduleName}`}
      />
      <Menu model={items} popup ref={menu} className="p-mt-1" />
      <Button
        icon={`pi ${mainMenu.iconName}`}
        onClick={(event) => menu.current.toggle(event)}
        className="p-d-md-none"
      />
    </div>
  );
};
