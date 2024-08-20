import React from "react";
import Drawer from "@/components/drawer";
import Link from "next/link";
import { MdBook, MdDashboard, MdOutlineStackedBarChart } from "react-icons/md";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="p-8">{children}</div>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-8">
              {/* Sidebar content here */}
              <li>
                <h1 className="font-extrabold mt-6">STORYKU</h1>
              </li>
              <li className="drawer-list mt-8 text-lg">
                <Link href={"/"}>
                  {" "}
                  <MdDashboard className="text-2xl mr-4" />
                  Dashboard
                </Link>
              </li>
              <li className="drawer-list mt-4 text-lg">
                <Link href={"/"}>
                  <MdBook className="text-2xl mr-4" />
                  Story Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Drawer>{children}</Drawer> */}
    </div>
  );
};

export default DashboardLayout;
