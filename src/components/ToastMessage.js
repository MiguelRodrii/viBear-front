import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
//import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../redux/actions/toast";
export const ToastMessage = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { isOpen, typeMessage, message } = useSelector((state) => state.toast);

  useEffect(() => {
    const showSuccess = () => {
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: message,
        life: 3000,
      });
    };

    const showInfo = () => {
      toast.current.show({
        severity: "info",
        summary: "Importante",
        detail: message,
        life: 3000,
      });
    };

    const showWarn = () => {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: message,
        life: 3000,
      });
    };

    const showError = () => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
    };

    if (isOpen) {
      switch (typeMessage) {
        case "success":
          showSuccess();
          return;
        case "info":
          showInfo();
          return;
        case "warn":
          showWarn();
          return;
        case "error":
          showError();
          return;
        case "clear":
          clearToast();
          return;
        default:
      }
    }
  }, [isOpen, typeMessage, message]);

  const clearToast = () => {
    toast.current.clear();
  };
  const handleHideToast = () => {
    dispatch(hideToast());
  };
  return (
    <div>
      <Toast style={{width:"20em"}} ref={toast} onRemove={handleHideToast} />
    </div>
  );
};
