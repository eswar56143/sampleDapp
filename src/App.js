import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { persistor, store } from "./redux/store";
import Application from "./Routes/Application";

function App() {
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <Application />
      </PersistGate>
    </Provider>
  );
}

export default App;
