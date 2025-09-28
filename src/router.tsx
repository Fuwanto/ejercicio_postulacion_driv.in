import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import HomeView from "./views/HomeView/HomeView";
import MapView from "./views/MapView/MapView";
import NotFoundView from "./views/NotFoundView/NotFoundView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/vehicles/:id" element={<MapView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
