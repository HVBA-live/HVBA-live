import { RouterProvider } from "react-router/dom";
import router from "./routes/routerProvider";

const App = () => {
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
}
export default App;