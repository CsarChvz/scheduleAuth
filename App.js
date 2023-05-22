import { Provider } from "react-redux";
import RootNavigator from "./src/navigations/RootStack";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
