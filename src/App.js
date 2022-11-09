import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { persistor, store } from "./redux/store";
import Application from "./Routes/Application";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Application />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
