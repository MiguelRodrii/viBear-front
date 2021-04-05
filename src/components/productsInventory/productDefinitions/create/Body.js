import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleProductTypes } from "../../../../redux/actions/productsInventory/productTypes";
import { createProductDefinition } from "../../../../redux/actions/productsInventory/productDefinitions";
import { showToast } from "../../../../redux/actions/toast";
import { Button } from "primereact/button";

export const Body = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(undefined);
  const { simpleProductTypes } = useSelector((state) => state.productTypes);

  useEffect(() => {
    dispatch(getSimpleProductTypes());
  }, [dispatch]);

  const hadleSubmitCreateProductDefinition = async () => {
    if (
      name === "" ||
      description === "" ||
      selectedProductTypeId === undefined
    ) {
      dispatch(showToast("warn", "Por favor, rellene todos los campos."));
      return;
    }
    const response = await dispatch(
      createProductDefinition(name, description, selectedProductTypeId)
    );
    if (response) {
      dispatch(
        showToast(
          "success",
          `Definición de producto: ${name} creado/a de forma exitosa.`
        )
      );
      setName("");
      setDescription("");
    } else {
      dispatch(
        showToast(
          "error",
          `La defincición de producto ya existe o contiene algún valor incorrecto.`
        )
      );
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
            Nombre del producto. Ejemplo: Aceite La Favorita 1L.
          </small>
        </div>

        <div className="p-field card">
          <label className="p-d-block">Descripción</label>
          <Editor
            value={description}
            onTextChange={(e) => setDescription(e.htmlValue)}
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
              value={selectedProductTypeId}
              options={simpleProductTypes}
              onChange={(e) => {
                setSelectedProductTypeId(e.value);
              }}
              placeholder="Seleccione un tipo de producto"
              optionLabel="name"
              optionValue="id"
            />
          )}
          <small className="p-d-block">
            Descripción del producto, puede incluir imágenes.
          </small>
        </div>

        <Button label="Crear" onClick={hadleSubmitCreateProductDefinition} />
      </Card>
    </>
  );
};
