import { toast } from "react-toastify";

class Toaster {
  success = (message) => {
    const options = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    toast.success(message, options);
  };

  error = (message) => {
    const options = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    toast.error(message, options);
  };

  info = (message) => {
    const options = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    toast.info(message, options);
  };
}

export const toasts = new Toaster();
