import React from "react";
import Link from "next/link";
import { MdBook, MdDashboard, MdOutlineStackedBarChart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden w-min mt-8 ml-8"
            >
              <IoMdMenu className="text-2xl" />
            </label>
            <div className="lg:p-8 min-h-screen">{children}</div>
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
