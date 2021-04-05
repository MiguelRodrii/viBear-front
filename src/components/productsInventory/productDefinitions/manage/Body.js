import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDefinitions } from "../../../../redux/actions/productsInventory/productDefinitions";

export const Body = () => {
  const dispatch = useDispatch();
  const { productDefinitions } = useSelector(
    (state) => state.productDefinitions
  );

  useEffect(() => {
    dispatch(getProductDefinitions());
  }, [dispatch]);

  return (
    <>
      <Card subTitle="Instrucciones">
        Bienvenido/a, en esta vista podrá ver, eliminar o actualizar los datos.
      </Card>
      <Card className="p-mt-2">
        {productDefinitions.lenght === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div className="datatable-responsive">
            <DataTable
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
              ></Column>
            </DataTable>
          </div>
        )}
      </Card>
    </>
  );
};
