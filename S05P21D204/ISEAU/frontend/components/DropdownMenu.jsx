/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, MenuIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
// import LoginModal from './modal/LoginModal';
// import SignupModal from './modal/SignupModal';
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropdownMenu = () => {
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const Login = () => {
    router.push({
      pathname: "/Login",
    });
  };
  const Signup = () => {
    router.push({
      pathname: "/Signup",
    });
  };
  const Modify = () => {
    router.push({
      pathname: "/PasswordConfirm",
    });
  };
  const Logout = () => {
    sessionStorage.removeItem("is_login");
    sessionStorage.removeItem("id");
    document.location.href = "/Login";
  };
  const scrapList = () => {
    router.push({
      pathname: "/ScrapList",
    });
  };
  // 로그인 상태관리
  const id = useSelector((state) => state.user.id);

  //로그인 되어있는지 아닌지
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    id == -1 ? setIsLogin(false) : setIsLogin(true);
  }, [isLogin]);

  // const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <Menu as="div" className="flex items-center space-x-6 justify-end text-gray-500">
      <div className="flex items-center border-2 p-1 focus:outline-none rounded-full cursor-pointer">
        <Menu.Button className="flex focus:outline-none">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-24 w-33 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {/* 로그인안했을때 */}
            {!isLogin && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      // onClick={()=> setShowLoginModal(true)}
                      onClick={Login}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      로그인
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      //onClick={()=> setShowSignupModal(true)}
                      onClick={Signup}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      회원가입
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
            {/*               로그인했을때 */}
            {isLogin && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      // onClick={()=> setShowLoginModal(true)}
                      onClick={Modify}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      회원정보수정
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      //onClick={()=> setShowSignupModal(true)}
                      onClick={Logout}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      로그아웃
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={scrapList}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      저장목록
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  About Us
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropdownMenu;
