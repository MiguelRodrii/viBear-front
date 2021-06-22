import React, { Switch, Route } from "react-router-dom";

// Main components
import { MainMenu } from "./components/MainMenu.js";
import { Tabs } from "./components/Tabs.js";

// Routers
import { ProductsInventoryRouter } from "./routers/ProductsInventoryRouter.js";

function App() {
  return (
    <>
      <div className="p-grid p-d-flex p-ai-center p-jc-between p-mb-2">
        <div className="p-ml-2">
          <MainMenu></MainMenu>
        </div>
        <div className="p-col">
          <Tabs siteName="Creación de definiciones de productos"></Tabs>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <ProductsInventoryRouter></ProductsInventoryRouter>
        </Route>
        <Route path="/productsInventory">
          <ProductsInventoryRouter></ProductsInventoryRouter>
        </Route>
      </Switch>
    </>
  );
}

export default App;
