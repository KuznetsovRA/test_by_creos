import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainPage from "../../pages/Main-page/Main-page.tsx";
import TasksPage from "../../pages/Task-page/Tasks-page.tsx";
import DesignerPage from "../../pages/Designer-page/Designer-page.tsx";
import Layout from "../../pages/Layoyt/Layoyt.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/designer" element={<DesignerPage />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
