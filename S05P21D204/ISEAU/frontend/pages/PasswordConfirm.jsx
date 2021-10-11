import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";

const PasswordConfirm = () => {
  const [Password, setPassword] = useState("");
  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const [isRight, setIsRight] = useState(false);

  useEffect(() => {
    {
      Password.length >= 10 && Password.length < 21 ? setIsRight(true) : setIsRight(false);
    }
  }, [Password, isRight]);

  const router = useRouter();

  // 회원정보수정 페이지로 이동
  const Confirm = () => {
    const token = sessionStorage.getItem("is_login");

    const id = sessionStorage.getItem("id");
    axios({
      method: "post",
      url: "http://j5d204.p.ssafy.io:8000/user/check/password/" + id,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: Password,
      },
    })
      .then(() => {
        router.push({
          pathname: "/ModifyUser",
        });
      })
      .catch((err) => {
        console.log(err);
        alert("비밀번호가 일치하지 않습니다!!");
      });
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative w-full md:w-1/3 my-20 mx-auto max-w-3xl bg-white">
          {/*content*/}
          <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">비밀번호를 입력해주세요.</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-1 text-black-900 font-bold text-lg leading-relaxed">Password</p>
              <input
                type="password"
                name="Password"
                value={Password}
                onChange={onChange}
                placeholder=" Password"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Password.length != 0 && (Password.length < 10 || Password.length > 20) && (
                <p className="text-red-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>
              )}
            </div>
            {/*footer*/}
            <div className="mt-3 flex flex-col items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
              <button
                className={isRight ? `button_active` : `button_unactive`}
                onClick={Confirm}
                // onKeyPress={enterkey}
                type="button"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="opacity-25 fixed inset-0"></div> */}
    </div>
  );
};

export default PasswordConfirm;
