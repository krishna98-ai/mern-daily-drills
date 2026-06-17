import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <h1>Navbar</h1>
      <Outlet />
    </>
  );
}

export default MainLayout;