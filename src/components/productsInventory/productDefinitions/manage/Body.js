import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductDefinition,
  getProductDefinitions,
  updateProductDefinition,
} from "../../../../redux/actions/productsInventory/productDefinitions";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { confirmDialog } from "primereact/confirmdialog";
import { showToast } from "../../../../redux/actions/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getSimpleProductTypes } from "../../../../redux/actions/productsInventory/productTypes";

export const Body = () => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isDescriptionDialogVisible, setIsDescriptionDialogVisible] = useState(
    false
  );
  const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useState(false);
  const [selectedProductDefinition, setSelectedProductDefinition] = useState(
    null
  );
  const { productDefinitions } = useSelector(
    (state) => state.productsInventory.productDefinitions
  );
  const { simpleProductTypes } = useSelector((state) => state.productsInventory.productTypes);

  useEffect(() => {
    dispatch(getProductDefinitions());
    dispatch(getSimpleProductTypes());
  }, [dispatch]);

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

  const descriptionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Descripción</span>
          <Button
            icon="pi pi-search"
            className="p-button-rounded p-button-help p-button-outlined"
            onClick={() => {
              setIsDescriptionDialogVisible(true);
              setSelectedProductDefinition(rowData);
            }}
          />
        </div>
      </React.Fragment>
    );
  };

  const productTypeNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-jc-between p-ai-center">
          <span className="p-column-title">Tipo</span>
          {rowData.product_type.name}
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
              setIsUpdateDialogVisible(true);
              setSelectedProductDefinition(rowData);
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

  const handleDeleteProductDefinition = async (rowData) => {
    const response = await dispatch(deleteProductDefinition(rowData));
    if (response) {
      dispatch(
        showToast(
          "success",
          `Definición de producto: ${rowData.name}, eliminado/a de forma exitosa.`
        )
      );
      return;
    }
    dispatch(
      showToast(
        "error",
        `No es posible eliminar la definición de producto: ${rowData.name}, pues de ella dependen uno o varios productos.`
      )
    );
  };

  const showConfirmDialog = (rowData) => {
    confirmDialog({
      message: `¿Está seguro/a de eliminar la definición de producto: ${rowData.name}?`,
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      baseZIndex: 1000,
      accept: () => handleDeleteProductDefinition(rowData),
      acceptLabel: "Si",
      rejectLabel: "No",
    });
  };

  const handleUpdateProductDefinition = async () => {
    if (
      selectedProductDefinition.name === "" ||
      selectedProductDefinition.description === ""
    ) {
      dispatch(showToast("warn", "Por favor, rellene todos los campos."));
      return;
    }
    const response = await dispatch(
      updateProductDefinition(selectedProductDefinition)
    );
    if (response) {
      dispatch(
        showToast(
          "success",
          `Tipo de producto: ${selectedProductDefinition.name}, actualizado de forma exitosa.`
        )
      );
      setIsUpdateDialogVisible(false);
      return;
    }
    dispatch(
      showToast("error", `No es posible actualizar el tipo de producto.`)
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
          onClick={handleUpdateProductDefinition}
          autoFocus
        />
      </div>
    );
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

  const header = renderHeader();

  return (
    <>
      <Card subTitle="Instrucciones">
        Bienvenido/a, en esta vista podrá ver, eliminar o actualizar los datos.
      </Card>
      <Card className="p-mt-2">
        {productDefinitions === null ? (
          <h1>Loading...</h1>
        ) : (
          <div className="datatable-responsive">
            <DataTable
              header={header}
              globalFilter={globalFilter}
              emptyMessage="No hay registros disponibles para mostrar"
              value={productDefinitions}
              dataKey="id"
              rows={4}
              paginator
              className="p-datatable-responsive"
            >
              <Column
                field="name"
                header="Nombre"
                sortable
                body={nameBodyTemplate}
              ></Column>

              <Column
                field="description"
                header="Descripción"
                body={descriptionBodyTemplate}
              ></Column>

              <Column
                field="product_type.name"
                body={productTypeNameBodyTemplate}
                header="Tipo"
              ></Column>

              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        )}
      </Card>

      <Dialog
        header="Descripción"
        visible={isDescriptionDialogVisible}
        onHide={() => setIsDescriptionDialogVisible(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        {selectedProductDefinition === null ? (
          <h1>Loading...</h1>
        ) : (
          <Editor
            value={selectedProductDefinition.description}
            readOnly={true}
            headerTemplate={`${selectedProductDefinition.name}`}
          />
        )}
      </Dialog>

      <Dialog
        header="Actualización"
        visible={isUpdateDialogVisible}
        onHide={() => setIsUpdateDialogVisible(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderUpdateDialogFooter}
      >
        {selectedProductDefinition === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="p-field">
              <label className="p-d-block">Nombre</label>
              <InputText
                className="p-d-block"
                value={selectedProductDefinition.name}
                onChange={(e) =>
                  setSelectedProductDefinition({
                    ...selectedProductDefinition,
                    name: e.target.value,
                  })
                }
                required={true}
              />
              <small className="p-d-block">
                Nombre del producto. Ejemplo: Aceite La Favorita 1L.
              </small>
            </div>

            <div className="p-field card">
              <label className="p-d-block">Descripción</label>
              <Editor
                value={selectedProductDefinition.description}
                onTextChange={(e) => {
                  setSelectedProductDefinition({
                    ...selectedProductDefinition,
                    description: e.htmlValue,
                  });
                }}
              />
              <small className="p-d-block">
                Descripción del producto, puede incluir imágenes.
              </small>
            </div>

            <div className="p-field card">
              <label className="p-d-block">Tipo de producto</label>
              {simpleProductTypes === null ? (
                <h1>Loading...</h1>
              ) : (
                <Dropdown
                  value={selectedProductDefinition.product_type.id}
                  options={simpleProductTypes}
                  onChange={(e) => {
                    setSelectedProductDefinition({
                      ...selectedProductDefinition,
                      product_type: {
                        ...selectedProductDefinition.product_type,
                        id: e.value,
                      },
                    });
                  }}
                  placeholder="Seleccione un tipo de producto"
                  optionLabel="name"
                  optionValue="id"
                />
              )}
              <small className="p-d-block">Tipo de producto.</small>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};
