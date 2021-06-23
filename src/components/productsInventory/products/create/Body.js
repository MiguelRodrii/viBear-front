import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDefinitions } from "../../../../redux/actions/productsInventory/productDefinitions";
import { Button } from "primereact/button";
import { showToast } from "../../../../redux/actions/toast";
import { createProduct } from "../../../../redux/actions/productsInventory/products";
import { createExpirationDate } from "../../../../redux/actions/productsInventory/expirationDates";
import { useDidMountEffect } from "../../../../hooks/useDidMountEffect.js";

export const Body = () => {
  const dispatch = useDispatch();
  const { productDefinitions } = useSelector(
    (state) => state.productsInventory.productDefinitions
  );
  const [selectedProductDefinition, setSelectedProductDefinition] =
    useState(null);
  const [amount, setAmount] = useState(1);
  const [purchasePrice, setPurchasePrice] = useState(0.01);
  const [purchasePriceHasIva, setPurchasePriceHasIva] = useState(false);
  const [salePrice, setSalePrice] = useState(0.01);
  const [salePriceHasIva, setSalePriceHasIva] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);
  const sync = useSelector((state) => state.navigation).mainMenu.sync;

  useEffect(() => {
    if (productDefinitions === null) getProductDefinitions()(dispatch);
  }, []);

  useDidMountEffect(() => {
    getProductDefinitions()(dispatch);
    showToast("success", `Sincronización exitosa.`)(dispatch);
  }, [sync]);

  const handleSubmitCreateProduct = async () => {
    if (selectedProductDefinition === null) {
      dispatch(
        showToast(
          "warn",
          "Por favor, rellene todos los campos. (Definición de producto.)"
        )
      );
      return;
    }
    if (
      selectedProductDefinition.product_type.is_expirable &&
      expirationDate == null
    ) {
      dispatch(
        showToast(
          "warn",
          "Por favor, rellene todos los campos. (Fecha de expiración)"
        )
      );
      return;
    }
    const response1 = await dispatch(
      createProduct(
        amount,
        purchasePriceHasIva
          ? purchasePrice -
              (purchasePrice *
                selectedProductDefinition.product_type.iva_percentage.value) /
                100
          : purchasePrice,
        salePriceHasIva
          ? salePrice -
              (salePrice *
                selectedProductDefinition.product_type.iva_percentage.value) /
                100
          : salePrice,
        selectedProductDefinition
      )
    );
    if (response1 === undefined) {
      dispatch(showToast("error", "No es posible registrar el producto."));
      return;
    }
    if (selectedProductDefinition.product_type.is_expirable) {
      const response2 = await dispatch(
        createExpirationDate(expirationDate, response1)
      );
      if (response2 === undefined) {
        dispatch(
          showToast(
            "warn",
            "El producto y sus valores se han registrado de forma exitosa. Sin embargo el registro de la fecha de expiración ha fracasado."
          )
        );
        return;
      }
    }
    dispatch(
      showToast(
        "success",
        "El producto y sus valores se han registrado de forma exitosa."
      )
    );
    setAmount(1);
    setPurchasePrice(0.01);
    setSalePrice(0.01);
    setExpirationDate(null);
  };

  return (
    <>
      <Card subTitle="Instrucciones">
        Bienvenido/a, por favor rellene todos los campos para poder continuar.
      </Card>
      <Card className="p-mt-2">
        <div className="p-field">
          <label className="p-d-block">Definición de producto</label>
          {productDefinitions === null ? (
            <ProgressSpinner />
          ) : (
            <>
              <Dropdown
                value={selectedProductDefinition}
                options={productDefinitions}
                optionLabel="name"
                filter
                filterInputAutoFocus={false}
                showFilterClear={true}
                placeholder="Seleccione una definición."
                onChange={(e) => {
                  setSelectedProductDefinition(e.value);
                }}
              ></Dropdown>
            </>
          )}
        </div>

        <div className="p-field">
          <label className="p-d-block">Cantidad</label>
          <InputNumber
            id="minmax-buttons"
            value={amount}
            onValueChange={(e) => setAmount(e.value)}
            mode="decimal"
            showButtons
            min={1}
            max={9999}
          />
        </div>

        <div className="p-field">
          <label className="p-d-block">Precio de compra</label>
          <div className="p-d-flex p-jc-between p-ai-center">
            <InputNumber
              id="currency-us"
              value={purchasePrice}
              onValueChange={(e) => setPurchasePrice(e.value)}
              mode="currency"
              currency="USD"
              locale="en-US"
              showButtons
              min={0.01}
              max={9999}
            />
            <InputSwitch
              checked={purchasePriceHasIva}
              onChange={(e) => {
                setPurchasePriceHasIva(e.value);
              }}
            />
          </div>
          <small className="p-d-block">
            Si el precio ingresado incluye el valor del IVA, active el switch.
          </small>
        </div>

        <div className="p-field">
          <label className="p-d-block">Precio de venta</label>
          <div className="p-d-flex p-jc-between p-ai-center">
            <InputNumber
              id="currency-us"
              value={salePrice}
              onValueChange={(e) => setSalePrice(e.value)}
              mode="currency"
              currency="USD"
              locale="en-US"
              showButtons
              min={0.01}
              max={9999}
            />
            <InputSwitch
              checked={salePriceHasIva}
              onChange={(e) => {
                setSalePriceHasIva(e.value);
              }}
            />
          </div>
          <small className="p-d-block">
            Si el precio ingresado incluye el valor del IVA, active el switch.
          </small>
        </div>

        {selectedProductDefinition === null ||
          (selectedProductDefinition.product_type.is_expirable && (
            <div className="p-field">
              <label className="p-d-block">Fecha de expiración</label>
              <Calendar
                dateFormat="dd/mm/yy"
                touchUI
                minDate={new Date()}
                id="icon"
                value={expirationDate}
                onChange={(e) => {
                  setExpirationDate(e.value);
                }}
                showIcon
              />
            </div>
          ))}
        <Button label="Crear" onClick={handleSubmitCreateProduct} />
      </Card>
    </>
  );
};
