import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { showToast } from "../../../../redux/actions/toast";
import { useDispatch, useSelector } from "react-redux";
import { getIvaPercentages } from "../../../../redux/actions/productsInventory/ivaPercentages";
import { createProductType } from "../../../../redux/actions/productsInventory/productTypes";
import { useDidMountEffect } from "../../../../hooks/useDidMountEffect.js";

export const Body = () => {
  const dispatch = useDispatch();
  const { ivaPercentages } = useSelector(
    (state) => state.productsInventory.ivaPercentages
  );
  const sync = useSelector((state) => state.navigation).mainMenu.sync;
  const [name, setName] = useState("");
  const [isExpirable, setIsExpirable] = useState(true);
  const [selectedIvaPercentageId, setselectedIvaPercentageId] =
    useState(undefined);

  useEffect(() => {
    if (ivaPercentages === null) getIvaPercentages()(dispatch);
  }, []);

  useDidMountEffect(() => {
    getIvaPercentages()(dispatch);
  }, [sync]);

  const onIvaPercentageChange = (e) => {
    setselectedIvaPercentageId(e.value);
  };

  const hadleSubmitCreateProductType = () => {
    if (name === "" || selectedIvaPercentageId === undefined) {
      dispatch(showToast("warn", "Por favor, rellene todos los campos."));
      return;
    }
    const success = dispatch(
      createProductType(name, isExpirable, selectedIvaPercentageId)
    );
    if (success) {
      setName("");
    }
  };

  return (
    <>
      <Card subTitle="Instrucciones">
        Bienvenido/a, por favor rellene todos los campos para poder continuar.
      </Card>
      <Card className="p-mt-2">
        <div className="p-field">
          <label className="p-d-block">Nombre</label>
          <InputText
            className="p-d-block"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <small className="p-d-block">
            Nombre del tipo de producto. Ejemplo: enlatados.
          </small>
        </div>

        <div className="p-field">
          <label htmlFor="productTypeIsExpirable" className="p-d-block">
            Es expirable
          </label>
          <InputSwitch
            checked={isExpirable}
            onChange={(e) => setIsExpirable(e.value)}
          />
          <small id="productTypeIsExpirable-help" className="p-d-block">
            Perecibilidad del producto.
          </small>
        </div>

        <div className="p-field">
          <label htmlFor="productTypeIva" className="p-d-block">
            Porcentaje de IVA aplicado
          </label>
          {ivaPercentages === null ? (
            <h1>Loading...</h1>
          ) : (
            <Dropdown
              value={selectedIvaPercentageId}
              options={ivaPercentages}
              onChange={onIvaPercentageChange}
              optionLabel="value"
              optionValue="id"
            />
          )}
          <small id="productTypeIva-help" className="p-d-block">
            Iva que aplica al tipo de producto.
          </small>
        </div>

        <Button label="Crear" onClick={hadleSubmitCreateProductType} />
      </Card>
    </>
  );
};
