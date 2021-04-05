import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../../redux/actions/toast";
import {
  getProductTypes,
  deleteProductType,
} from "../../../../redux/actions/productsInventory/productTypes";

export const Body = () => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState(null);
  const { productTypes } = useSelector((state) => state.productTypes);

  useEffect(() => {
    dispatch(getProductTypes());
  }, [dispatch]);

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
    </>
  );
};
