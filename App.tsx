import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { store } from "./src/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
