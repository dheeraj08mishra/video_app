import { Provider } from "react-redux";
import appStore from "../utils/redux/appStore";
import Body from "./Body";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </>
  );
};
export default App;
