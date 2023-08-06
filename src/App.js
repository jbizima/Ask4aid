import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout, { loader } from "./components/Layout";
import Provider from "./components/Provider";
import Locations from "./components/Locations";
import Destination from "./components/Destination";
import Login, { action as loginAction } from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import NewLocation from "./pages/NewLocation";
import PendingLocation from "./pages/PendingLocation";
import Signup, { action as signupAction } from "./pages/Signup";
import Contributors from "./pages/Contributors";

function App() {
  const elements = createRoutesFromElements(
    <Route path="/" loader={loader} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" action={loginAction} element={<Login />} />
      <Route path="signup" action={signupAction} element={<Signup />} />
      <Route path=":countryId" element={<Locations />} />
      <Route path="destination/:id" element={<Destination />} />
      <Route path="contribute" element={<ProtectedRoute />}>
        <Route index element={<PendingLocation />} />
        <Route path="new-location" element={<NewLocation />} />
        <Route path="contributors" element={<Contributors />} />
      </Route>
    </Route>
  );
  const routes = createBrowserRouter(elements);
  return (
    <Provider>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
