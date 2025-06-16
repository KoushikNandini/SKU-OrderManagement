import { useState } from "react";

export const useToast = () => {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("Success");
  const [message, setMessage] = useState("");

  const triggerToast = (msg, type = "success", timestamp = 3000) => {
    setMessage(msg);
    setVariant(type);
    setShow(true);
    setTimeout(() => setShow(false), timestamp);
  };

  const Toast = () =>
    show ? (
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <div className={`toast show bg-${variant} text-white`}>
          <div className="toast-body">{message}</div>
        </div>
      </div>
    ) : null;

  return { Toast, triggerToast };
};
