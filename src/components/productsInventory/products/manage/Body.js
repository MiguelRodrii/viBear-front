import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpirationDate,
  deleteExpirationDate,
  getExpirationDates,
  updateExpirationDate,
} from "../../../../redux/actions/productsInventory/expirationDates";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../../redux/actions/productsInventory/products";
import { showToast } from "../../../../redux/actions/toast";
import { getSimpleProductDefinitions } from "../../../../redux/actions/productsInventory/productDefinitions";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Calendar } from "primereact/calendar";
import { round } from 'mathjs'

export const Body = () => {
  const dispatch = useDispatch();
  const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);
  const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [calendarExpirationDate, setCalendarExpirationDate] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [purchasePriceHasIva, setPurchasePriceHasIva] = useState(false);
  const [salePriceHasIva, setSalePriceHasIva] = useState(false);
  const { products } = useSelector((state) => state.products);
  const { expirationDates } = useSelector((state) => state.expirationDates);
  const { simpleProductDefinitions } = useSelector(
    (state) => state.productDefinitions
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getExpirationDates());
    dispatch(getSimpleProductDefinitions());
  }, [dispatch]);

  const renderHeader = () => {
    return (
      <div className="p-d-flex p-jc-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Busqueda global"
          />
        </span>
      </div>
    );
  };

  const productTypeNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Nombre</span>
          {rowData.product_definition.name}
        </div>
      </React.Fragment>
    );
  };

  const purchasePriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Precio de compra</span>
          {rowData.purchase_price} $
        </div>
      </React.Fragment>
    );
  };

  const salePriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Precio de venta</span>
          {rowData.sale_price} $
        </div>
      </React.Fragment>
    );
  };

  const salePriceWithIvaBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Precio de venta con iva</span>
          {round(rowData.sale_price + (rowData.sale_price * rowData.product_definition.product_type.iva_percentage.value/100),2)} $
        </div>
      </React.Fragment>
    );
  };

  const currentAmountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Cantidad actual</span>
          {rowData.current_amount}
        </div>
      </React.Fragment>
    );
  };

  const expirationDateBodyTemplate = (rowData) => {
    const expirationDate =
      rowData.product_definition.product_type.is_expirable &&
      expirationDates.find((element) => {
        return element.product.id === rowData.id;
      });
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Fecha de expiración</span>
          {rowData.product_definition.product_type.is_expirable ? (
            expirationDate === undefined ? (
              <Button
                icon="pi pi-exclamation-triangle"
                className="p-button-rounded p-button-danger p-button-outlined"
                onClick={() => {
                  setIsAlertDialogVisible(true);
                  setSelectedProduct(rowData);
                }}
              />
            ) : (
              new Date(expirationDate.value).toLocaleDateString()
            )
          ) : (
            `No expirable`
          )}
        </div>
      </React.Fragment>
    );
  };

  const handleDeleteProductDefinition = async (rowData) => {
    if (rowData.product_definition.product_type.is_expirable) {
      const expirationDate = expirationDates.find((element) => {
        return element.product.id === rowData.id;
      });
      const response =
        expirationDate === undefined
          ? true
          : await dispatch(deleteExpirationDate(expirationDate.id));
      if (!response) {
        dispatch(
          showToast(
            "error",
            "Ha ocurrido un error en la eliminación del producto."
          )
        );
        return;
      }
    }
    const response = await dispatch(deleteProduct(rowData.id));
    if (!response) {
      dispatch(
        showToast(
          "error",
          "Ha ocurrido un error en la eliminación del producto."
        )
      );
      return;
    }
    dispatch(
      showToast(
        "success",
        `Producto ${rowData.product_definition.name} y sus valores eliminados de forma exitosa.`
      )
    );
  };

  const showConfirmDialog = (rowData) => {
    confirmDialog({
      message: `¿Está seguro/a de eliminar el producto: ${rowData.product_definition.name}?`,
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      baseZIndex: 1000,
      accept: () => handleDeleteProductDefinition(rowData),
      acceptLabel: "Si",
      rejectLabel: "No",
    });
  };

  const handleUpdateProduct = async () => {
    if (calendarExpirationDate === null) {
      dispatch(
        showToast(
          "warn",
          "Por favor rellene todos los campos para poder continuar. (Fecha de expiración)"
        )
      );
      return;
    }
    if (expirationDate === null) {
      const response1 = await dispatch(
        createExpirationDate(calendarExpirationDate, selectedProduct.id)
      );
      if (response1 === undefined) {
        dispatch(
          showToast(
            "error",
            "Ha ocurrido un error en el proceso de actualización. (Fecha de expiración)"
          )
        );
        return;
      }
    } else {
      const response2 = await dispatch(
        updateExpirationDate(
          expirationDate.id,
          calendarExpirationDate.toDateString()
        )
      );
      if (!response2) {
        dispatch(
          showToast(
            "error",
            "Ha ocurrido un error en el proceso de actualización. (Fecha de expiración)"
          )
        );
        return;
      }
    }
    const ivaPercentageValue = simpleProductDefinitions.find((element) => {
      return element.id === selectedProduct.product_definition.id;
    }).product_type.iva_percentage.value;
    const response3 = await dispatch(
      updateProduct(
        selectedProduct.id,
        selectedProduct.product_definition.id,
        selectedProduct.current_amount,
        purchasePriceHasIva
          ? selectedProduct.purchase_price -
              (selectedProduct.purchase_price * ivaPercentageValue) / 100
          : selectedProduct.purchase_price,
        salePriceHasIva
          ? selectedProduct.sale_price -
              (selectedProduct.sale_price * ivaPercentageValue) / 100
          : selectedProduct.sale_price
      )
    );
    if (!response3) {
      dispatch(
        showToast(
          "error",
          "Ha ocurrido un error en el proceso de actualización. (Valores del producto)"
        )
      );
      return;
    }
    dispatch(
      showToast(
        "success",
        "Producto y sus valores actualizados de manera exitosa."
      )
    );
    setIsUpdateDialogVisible(false);
  };

  const renderUpdateDialogFooter = () => {
    return (
      <div className="p-d-flex">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => setIsUpdateDialogVisible(false)}
          className="p-button-text"
        />
        <Button
          label="Editar"
          icon="pi pi-check"
          onClick={handleUpdateProduct}
          autoFocus
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const currentExpirationDate = expirationDates.find((element) => {
      return element.product.id === rowData.id;
    });
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-center">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => {
              setIsUpdateDialogVisible(true);
              setSelectedProduct(rowData);
              setExpirationDate(
                currentExpirationDate === undefined
                  ? null
                  : currentExpirationDate
              );
              setCalendarExpirationDate(
                currentExpirationDate === undefined
                  ? null
                  : new Date(currentExpirationDate.value)
              );
            }}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => {
              showConfirmDialog(rowData);
            }}
          />
        </div>
      </React.Fragment>
    );
  };

  const header = renderHeader();
  return (
    <>
      <Card subTitle="Instrucciones">
        Bienvenido/a, en esta vista podrá ver, eliminar o actualizar los datos.
      </Card>
      <Card className="p-mt-2">
        {products === null ? (
          <ProgressSpinner />
        ) : (
          <div className="datatable-responsive">
            <DataTable
              header={header}
              globalFilter={globalFilter}
              emptyMessage="No hay registros disponibles para mostrar"
              value={products}
              dataKey="id"
              rows={4}
              paginator
              className="p-datatable-responsive"
            >
              <Column
                header="Nombre"
                field="product_definition.name"
                body={productTypeNameBodyTemplate}
              ></Column>

              <Column
                header="Precio de compra"
                field="purchase_price"
                body={purchasePriceBodyTemplate}
              ></Column>

              <Column
                header="Precio de venta"
                field="sale_price"
                body={salePriceBodyTemplate}
              ></Column>

              <Column
                header="Precio de venta con iva"
                body={salePriceWithIvaBodyTemplate}
              ></Column>

              <Column
                header="Cantidad actual"
                field="current_amount"
                body={currentAmountBodyTemplate}
              ></Column>

              {expirationDates === null ? (
                <ProgressSpinner />
              ) : (
                <Column
                  header="Fecha de expiración"
                  body={expirationDateBodyTemplate}
                ></Column>
              )}

              {expirationDates === null ? (
                <ProgressSpinner />
              ) : (
                <Column body={actionBodyTemplate}></Column>
              )}
            </DataTable>
          </div>
        )}
      </Card>
      <Dialog
        header="Advertencia"
        visible={isAlertDialogVisible}
        onHide={() => setIsAlertDialogVisible(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        {selectedProduct === null ? (
          <ProgressSpinner></ProgressSpinner>
        ) : (
          `El producto ${selectedProduct.product_definition.name} no tiene una fecha de caducidad y es del tipo ${selectedProduct.product_definition.product_type.name} que si es expirable. \n Agregue una fecha de caducidad al mismo cuanto antes o modifique la expirabilidad del tipo de producto.`
        )}
      </Dialog>

      <Dialog
        footer={renderUpdateDialogFooter}
        header="Actualización"
        visible={isUpdateDialogVisible}
        onHide={() => setIsUpdateDialogVisible(false)}
      >
        {selectedProduct === null ? (
          <ProgressSpinner />
        ) : (
          <>
            <div className="p-field">
              <label className="p-d-block">Definición de producto</label>
              {simpleProductDefinitions === null ? (
                <ProgressSpinner />
              ) : (
                <Dropdown
                  value={selectedProduct.product_definition.id}
                  options={simpleProductDefinitions}
                  optionLabel="name"
                  filter={true}
                  filterBy="name"
                  optionValue="id"
                  placeholder="Seleccione una definición."
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      product_definition: {
                        ...selectedProduct.product_definition,
                        id: e.value,
                      },
                    });
                  }}
                ></Dropdown>
              )}
            </div>

            <div className="p-field">
              <label className="p-d-block">Cantidad</label>
              <InputNumber
                id="minmax-buttons"
                value={selectedProduct.current_amount}
                onValueChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    current_amount: e.value,
                  })
                }
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
                  value={selectedProduct.purchase_price}
                  onValueChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      purchase_price: e.value,
                    })
                  }
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
                Si el precio ingresado incluye el valor del IVA, active el
                switch.
              </small>
            </div>

            <div className="p-field">
              <label className="p-d-block">Precio de venta</label>
              <div className="p-d-flex p-jc-between p-ai-center">
                <InputNumber
                  id="currency-us"
                  value={selectedProduct.sale_price}
                  onValueChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      sale_price: e.value,
                    })
                  }
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
                Si el precio ingresado incluye el valor del IVA, active el
                switch.
              </small>
            </div>

            {selectedProduct.product_definition.product_type.is_expirable && (
              <div className="p-field">
                <label className="p-d-block">Fecha de expiración</label>
                <Calendar
                  dateFormat="dd/mm/yy"
                  touchUI
                  minDate={new Date()}
                  value={calendarExpirationDate}
                  onChange={(e) => {
                    setCalendarExpirationDate(e.value);
                  }}
                  showIcon
                />
              </div>
            )}
          </>
        )}
      </Dialog>
    </>
  );
};
