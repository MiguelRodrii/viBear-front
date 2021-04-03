import { Switch, Route } from "react-router-dom";

// Pages
import { ProductsInventory } from "./pages/productsInventory";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ProductsInventory></ProductsInventory>
        </Route>
        <Route path="/productsInventory">
          <ProductsInventory></ProductsInventory>
        </Route>
      </Switch>
    </>
  );
}

export default App;
