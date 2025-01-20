import { Outlet } from "react-router";

function LayoutComponent() {
  return (
    <div className="relative space-y-8 md:space-y-12 lg:space-y-16">
      <header />
      <main className="container">
        <Outlet />
      </main>
      <footer />
    </div>
  );
}

export default LayoutComponent;
