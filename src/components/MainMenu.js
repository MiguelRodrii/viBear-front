import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {sync} from "../redux/actions/navigation.js";

export const MainMenu = () => {
  const menu = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { mainMenu } = useSelector((state) => state.navigation);

  const items = [
    {
      label: "Inventario de productos",
      icon: "pi pi-fw pi-th-large",
      command: () => { history.push(`/productsInventory`)},
    },
    {
      label: "Sync",
      icon: "pi pi-fw pi-refresh",
      command: () => {sync(!mainMenu.sync)(dispatch)}
    }
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
