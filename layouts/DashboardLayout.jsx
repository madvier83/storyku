import React from "react";
import Drawer from "@/components/drawer";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Drawer>{children}</Drawer>
    </div>
  );
};

export default DashboardLayout;
