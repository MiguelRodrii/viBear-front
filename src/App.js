import { Switch, Route } from "react-router-dom";

// Pages
import { ProductsInventory } from "./pages/productsInventory";
import { Create as CreateProductType } from "./pages/productsInventory/productTypes/Create";
import { Manage as ManageProductTypes } from "./pages/productsInventory/productTypes/Manage";
import { Create as CreateProductDefinition } from "./pages/productsInventory/productDefinitions/Create";
import { Manage as ManageProductDefinition } from "./pages/productsInventory/productDefinitions/Manage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ProductsInventory></ProductsInventory>
        </Route>
        <Route exact path="/productsInventory">
          <ProductsInventory></ProductsInventory>
        </Route>
        <Route exact path="/productsInventory/productTypes/create">
          <CreateProductType></CreateProductType>
        </Route>
        <Route exact path="/productsInventory/productTypes/manage">
          <ManageProductTypes></ManageProductTypes>
        </Route>
        <Route exact path="/productsInventory/productDefinitions/create">
          <CreateProductDefinition></CreateProductDefinition>
        </Route>
        <Route exact path="/productsInventory/productDefinitions/manage">
          <ManageProductDefinition></ManageProductDefinition>
        </Route>
        <Route path="*">
          <ProductsInventory></ProductsInventory>
        </Route>
      </Switch>
    </>
  );
}

export default App;
