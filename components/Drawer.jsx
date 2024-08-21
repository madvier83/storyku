import Link from "next/link";
import React from "react";

const Drawer = ({ children }) => {
  return (
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
            <li>
              <h1 className="font-extrabold mt-6 text-[#1E96AB]">STORYKU</h1>
            </li>
            <li className="drawer-list mt-4">
              <Link href={"/"}>Dashboard</Link>
            </li>
            <li className="drawer-list bg-teal-300">
              <Link href={"/"}>Story Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
