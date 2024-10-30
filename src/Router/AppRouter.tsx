import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import HeroPage from "../pages/HeroPage/HeroPage";
import Layout from "../layout/Layout";

interface AppRouterProps {}

const AppRouter: FC<AppRouterProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/hero/:slug" element={<HeroPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
