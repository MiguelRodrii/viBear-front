import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const MainMenu = ({
  moduleName = "Dashboard",
  iconName = "pi-home",
}) => {
  const menu = useRef(null);
  const history = useHistory();

  MainMenu.propTypes = {
    moduleName: PropTypes.string,
    iconName: PropTypes.string,
  };

  const handleCreateProductType = () => {
    history.push("/productsInventory");
  };

  const items = [
    {
      label: "Inventario de productos",
      icon: "pi pi-fw pi-th-large",
      command: handleCreateProductType,
    },
  ];

  return (
    <div className="p-fluid">
      <Button
        icon={`pi ${iconName}`}
        onClick={(event) => menu.current.toggle(event)}
        className="p-d-none p-d-md-inline-flex"
        label={`${moduleName}`}
      />
      <Menu model={items} popup ref={menu} className="p-mt-1" />
      <Button
        icon={`pi ${iconName}`}
        onClick={(event) => menu.current.toggle(event)}
        className="p-d-md-none"
      />
    </div>
  );
};
