import RouteManager from "xtend/RouteManager";
import LayoutNavigationBar from "components/layouts/LayoutNavigationBar";
import "styles/index.scss";

const App = () => {

  return (
    <>
      <LayoutNavigationBar/>
      <RouteManager/>
    </>
  )
}

export default App
