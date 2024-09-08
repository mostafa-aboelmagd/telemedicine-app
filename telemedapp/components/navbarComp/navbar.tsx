import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";
import MenuList from "../MenuList/menuList";
import { IoMenu } from "react-icons/io5";

const menuIcon = <div><IoMenu /></div>;
const Navbar = () => {
  return (
    <nav className="h-14 bg-white border border-b-[1px] sticky top-0 z-10 mb-8">
      <div className="max-w-full md:max-w-[90%] lg:max-w-[75%] flex justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex justify-center items-center">
            <img className="w-14 h-14" src="assets/logo.png" alt="logo" />
            <span className="text-xl">TeleMedPilot</span>
          </div>
        </Link>
        <div className="hidden lg:inline-block flex justify-between space-x-4 text-[#4d4d4f] text-sm font-light">
          <Link href="/doctors">
            <button className="hover:text-[#035fe9]">Doctor List</button>
          </Link>
          <button className="hover:text-[#035fe9]">Tests</button>
          <button className="hover:text-[#035fe9]">Find A Doctor</button>
          <button className="hover:text-[#035fe9]">Blog</button>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <a className="cursor-pointer">العربيه</a>
          <Link href="/auth/signin">
            <button className="hidden lg:inline-block border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2 my-2">
              Sign in
            </button>
            <button className="lg:hidden text-[#035fe9] p-2 my-2">
              <PiSignInBold />
            </button>
          </Link>
          <Link href="/auth/signup">
            <button
              className={
                styles.gradient_button +
                " hidden lg:inline-block px-12 py-2 my-2 text-white rounded-lg "
              }
            >
              Sign up
            </button>
            <button className="lg:hidden p-2 my-2 text-[#035fe9] rounded-lg">
              <BsPersonFillAdd />
            </button>
          </Link>
          <MenuList linkTo={["/doctors", "", "", ""]} linkName={["Doctor List", "Tests", "Find a Doctor", "Blog"]} text={menuIcon} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
