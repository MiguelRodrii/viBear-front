import { Menubar } from "primereact/menubar";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const Tabs = ({ siteName = "Inventario de productos" }) => {
  const history = useHistory();

  Tabs.propTypes = {
    siteName: PropTypes.string,
  };

  const handleCreateProductType = () => {
    history.push("/productsInventory/productTypes/create");
  };
  const handleManageProductTypes = () => {
    history.push("/productsInventory/productTypes/manage");
  };
  const handleCreateProductDefinition = () => {
    history.push("/productsInventory/productDefinitions/create");
  };
  const handleManageProductDefinitions = () => {
    history.push("/productsInventory/productDefinitions/manage");
  };

  const items = [
    {
      label: "Productos",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Crear nuevo producto",
          icon: "pi pi-fw pi-plus",
        },
        {
          label: "Administrar productos",
          icon: "pi pi-fw pi-eye",
        },
      ],
    },
    {
      label: "Definiciones de productos",
      icon: "pi pi-fw pi-align-center",
      items: [
        {
          label: "Crear nueva definición de producto",
          icon: "pi pi-fw pi-plus",
          command: handleCreateProductDefinition,
        },
        {
          label: "Administrar definiciones de productos",
          icon: "pi pi-fw pi-eye",
          command: handleManageProductDefinitions,
        },
      ],
    },
    {
      label: "Tipos de productos",
      icon: "pi pi-fw pi-book",
      items: [
        {
          label: "Crear nuevo tipo de producto",
          icon: "pi pi-fw pi-plus",
          command: handleCreateProductType,
        },
        {
          label: "Administrar tipos de productos",
          icon: "pi pi-fw pi-eye",
          command: handleManageProductTypes,
        },
      ],
    },
  ];

  return (
      <Menubar start={`${siteName}`} className="p-jc-between" model={items} />
  );
};
