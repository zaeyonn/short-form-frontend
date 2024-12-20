import RouteManager from "xtend/RouteManager";
import AuthManager from "xtend/AuthManager";
import LayoutNavigationBar from "components/layouts/LayoutNavigationBar";
import "styles/index.scss";

const App = () => {

  return (
    <>
      <LayoutNavigationBar/>
      <RouteManager/>
      <AuthManager/>
    </>
  )
}

export default App
