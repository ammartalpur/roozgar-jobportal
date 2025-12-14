import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    // 1. Root Container: Add 'relative' for absolute positioning, keep Flex for footer.
    <div className="min-h-screen flex flex-col relative">
      {/* 2. Background: Take it out of the layout flow and put it behind everything. */}
      <div className="grid-background absolute inset-0 z-0"></div>

      {/* 3. Main Content: Stretches to push the footer down. */}
      <main className=" px-1 sm:px-6 lg:px-8 overflow-hidden grow relative z-10">
        <Header />
        <Outlet />
      </main>

      {/* Footer: Stays at the bottom. */}
      <div className="p-10 text-center bg-gray-800">
        Made with 💗 by Ammar Talpur
      </div>
    </div>
  )
}

export default AppLayout
