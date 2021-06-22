import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../../redux/actions/toast";
import {
  getProductTypes,
  deleteProductType,
  updateProductType,
} from "../../../../redux/actions/productsInventory/productTypes";
import { getIvaPercentages } from "../../../../redux/actions/productsInventory/ivaPercentages";
import { Dropdown } from "primereact/dropdown";

export const Body = () => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { productTypes } = useSelector((state) => state.productsInventory.productTypes);
  const { ivaPercentages } = useSelector((state) => state.productsInventory.ivaPercentages);

  useEffect(() => {
    dispatch(getProductTypes());
    if (ivaPercentages === null) dispatch(getIvaPercentages());
  }, [dispatch, ivaPercentages]);

  const renderFooter = () => {
    return (
      <div className="p-d-flex">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => setIsDialogVisible(false)}
          className="p-button-text"
        />
        <Button
          label="Editar"
          icon="pi pi-check"
          onClick={handleUpdateProductType}
          autoFocus
        />
      </div>
    );
  };

  const handleUpdateProductType = async () => {
    if (selectedProductType.name === "") {
      dispatch(showToast("warn", "Por favor, rellene todos los campos."));
      return;
    }
    const response = await dispatch(updateProductType(selectedProductType));
    if (response) {
      dispatch(
        showToast(
          "success",
          `Tipo de producto: ${selectedProductType.name}, actualizado de forma exitosa.`
        )
      );
      setIsDialogVisible(false);
    } else {
      dispatch(
        showToast("error", `No es posible actualizar el tipo de producto.`)
      );
      setIsDialogVisible(false);
    }
  };

  const handleDeleteProductType = async (rowData) => {
    const response = await dispatch(deleteProductType(rowData));
    if (response) {
      dispatch(
        showToast(
          "success",
          `Tipo de producto: ${rowData.name}, eliminado de forma exitosa.`
        )
      );
    } else {
      dispatch(
        showToast(
          "error",
          `No es posible eliminar el tipo de producto: ${rowData.name}, pues de el dependen una o varias definiciones de producto.`
        )
      );
    }
  };

  const showConfirmDialog = (rowData) => {
    confirmDialog({
      message: `¿Está seguro/a de eliminar el tipo de producto: ${rowData.name}?`,
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      baseZIndex: 1000,
      accept: () => handleDeleteProductType(rowData),
      acceptLabel: "Si",
      rejectLabel: "No",
    });
  };

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

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Nombre</span>
          {rowData.name}
        </div>
      </React.Fragment>
    );
  };

  const isExpirableBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Es expirable</span>
          <Checkbox checked={rowData.is_expirable}></Checkbox>
        </div>
      </React.Fragment>
    );
  };

  const ivaPercentageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">IVA</span>
          {rowData.iva_percentage.value} %
        </div>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-center">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => {
              setIsDialogVisible(true);
              setSelectedProductType(rowData);
            }}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => showConfirmDialog(rowData)}
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
        {productTypes === null ? (
          <h1>Loading...</h1>
        ) : (
          <div className="datatable-responsive">
            <DataTable
              emptyMessage="No hay registros disponibles para mostrar"
              header={header}
              globalFilter={globalFilter}
              value={productTypes}
              dataKey="id"
              rows={4}
              paginator
              className="p-datatable-responsive"
            >
              <Column
                field="name"
                header="Nombre"
                body={nameBodyTemplate}
                sortable
              ></Column>
              <Column
                field="is_expirable"
                header="Es expirable"
                body={isExpirableBodyTemplate}
                sortable
              >
                Yo
              </Column>
              <Column
                field="iva_percentage.value"
                header="IVA"
                body={ivaPercentageBodyTemplate}
                sortable
              ></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        )}
      </Card>

      <Dialog
        header="Header"
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter()}
      >
        {selectedProductType === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="p-field">
              <label className="p-d-block">Nombre</label>
              <InputText
                className="p-d-block"
                value={selectedProductType.name}
                onChange={(e) =>
                  setSelectedProductType({
                    ...selectedProductType,
                    name: e.target.value,
                  })
                }
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
                inputId="productTypeIsExpirable"
                checked={selectedProductType.is_expirable}
                onChange={(e) =>
                  setSelectedProductType({
                    ...selectedProductType,
                    is_expirable: e.value,
                  })
                }
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
                  value={selectedProductType.iva_percentage.id}
                  onChange={(e) => {
                    setSelectedProductType({
                      ...selectedProductType,
                      iva_percentage: {
                        ...selectedProductType.iva_percentage,
                        id: e.value,
                      },
                    });
                  }}
                  options={ivaPercentages}
                  optionLabel="value"
                  optionValue="id"
                />
              )}
              <small id="productTypeIva-help" className="p-d-block">
                Iva que aplica al tipo de producto.
              </small>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};
