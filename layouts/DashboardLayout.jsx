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
            <ul className="menu bg-gray-50 text-base-content min-h-full w-80 p-0">
              <li>
                <h1 className="font-extrabold mt-14 mx-auto text-[#1E96AB]">
                  STORYKU
                </h1>
              </li>
              <li className="mt-8 text-lg py-4 px-6 text-gray-500">
                <Link
                  href={"/"}
                  className="hover:bg-transparent active:bg-transparent"
                >
                  <MdDashboard className="text-2xl mr-4" />
                  Dashboard
                </Link>
              </li>
              <li className="text-lg bg-[#20bad5] py-4 px-6 text-white">
                <Link
                  href={"/"}
                  className="hover:bg-transparent active:bg-transparent"
                >
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
