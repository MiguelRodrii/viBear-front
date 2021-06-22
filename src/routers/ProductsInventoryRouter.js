import React, {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  updateMainMenu,
  updateTabsSiteName,
  updateTabsItems,
} from "../redux/actions/navigation.js";

// Pages
import { ProductsInventory } from "../containers/productsInventory";
import { Create as CreateProductType } from "../containers/productsInventory/productTypes/Create";
import { Manage as ManageProductTypes } from "../containers/productsInventory/productTypes/Manage";
import { Create as CreateProductDefinition } from "../containers/productsInventory/productDefinitions/Create";
import { Manage as ManageProductDefinition } from "../containers/productsInventory/productDefinitions/Manage";
import { Create as CreateProducts } from "../containers/productsInventory/products/Create";
import { Manage as ManageProducts } from "../containers/productsInventory/products/Manage";

export const ProductsInventoryRouter = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  
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
  const handleCreateProducts = () => {
    history.push("/productsInventory/products/create");
  };
  const handleManageProducts = () => {
    history.push("/productsInventory/products/manage");
  };
  const items = [
    {
      label: "Productos",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Crear nuevo producto",
          icon: "pi pi-fw pi-plus",
          command: handleCreateProducts,
        },
        {
          label: "Administrar productos",
          icon: "pi pi-fw pi-eye",
          command: handleManageProducts,
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

  useEffect(() => {
    updateMainMenu("Inventario de productos", "pi-th-large")(dispatch);
    updateTabsSiteName("Inventario de productos")(dispatch);
    updateTabsItems(items)(dispatch);
  }, []);

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`}>
          <ProductsInventory></ProductsInventory>
        </Route>
        <Route exact path={`${match.path}/productTypes/create`}>
          <CreateProductType></CreateProductType>
        </Route>
        <Route exact path={`${match.path}/productTypes/manage`}>
          <ManageProductTypes></ManageProductTypes>
        </Route>
        <Route exact path={`${match.path}/productDefinitions/create`}>
          <CreateProductDefinition></CreateProductDefinition>
        </Route>
        <Route exact path={`${match.path}/productDefinitions/manage`}>
          <ManageProductDefinition></ManageProductDefinition>
        </Route>
        <Route exact path={`${match.path}/products/create`}>
          <CreateProducts />
        </Route>
        <Route exact path={`${match.path}/products/manage`}>
          <ManageProducts />
        </Route>
        <Route path="*">
          <ProductsInventory></ProductsInventory>
        </Route>
      </Switch>
    </>
  );
};
