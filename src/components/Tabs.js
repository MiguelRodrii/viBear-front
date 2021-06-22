import { Menubar } from "primereact/menubar";
import React from "react-router-dom";
import { useSelector } from "react-redux";

export const Tabs = () => {
  const { tabs } = useSelector((state) => state.navigation);

  return (
    <Menubar
      start={`${tabs.siteName}`}
      className="p-jc-between"
      model={tabs.items}
    />
  );
};
