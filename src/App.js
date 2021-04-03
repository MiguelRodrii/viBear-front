import { Switch, Route } from "react-router-dom";

// Pages
import { ProductsInventory } from "./pages/productsInventory";
import { CreateProductType } from "./pages/productsInventory/productTypes/CreateProductType";

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
      </Switch>
    </>
  );
}

export default App;
