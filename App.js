import { Provider } from "react-redux";
import RootNavigator from "./src/navigations/RootStack";
import { store } from "./src/app/store";

export default function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
