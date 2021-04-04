import { Switch, Route } from "react-router-dom";

// Pages
import { ProductsInventory } from "./pages/productsInventory";
import { CreateProductType } from "./pages/productsInventory/productTypes/CreateProductType";
import {ManageProductTypes} from "./pages/productsInventory/productTypes/ManageProductTypes";

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
        <Route exact path="/productsInventory/productTypes/createProductType">
          <CreateProductType></CreateProductType>
        </Route>
        <Route exact path="/productsInventory/productTypes/manageProductTypes">
          <ManageProductTypes></ManageProductTypes>
        </Route>
      </Switch>
    </>
  );
}

export default App;
