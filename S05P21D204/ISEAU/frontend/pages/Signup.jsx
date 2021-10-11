import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
const Signup = () => {
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
    PasswordConfirm: "",
    Nickname: "",
    Address: "",
    PhoneNumber: "",
  });
  const router = useRouter();
  const [isRight, setIsRight] = useState(false);
  const [isNicknameRight, setIsNicknameRight] = useState(false);
  const [isEmailRight, setIsEmailRight] = useState(false);
  const { Email, Password, PasswordConfirm, Nickname, Address, PhoneNumber } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  // 이메일 유효성검사
  const isEmail = (Email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(Email);
  };
  // 전화번호 유효성검사  무조건 숫자만 들어갈수있도록
  // const isNumber = (PhoneNumber) => {
  //   const numberRegex = /^[0-9]{1,100}$/g;
  //   return numberRegex.test(PhoneNumber);
  // };

  // Nickname 유효성검사 특수문자 불가
  const isNickname = (Nickname) => {
    const nicknameRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    return nicknameRegex.test(Nickname);
  };

  // 주소 유효성검사 특수문자 안되게
  // const isAddress = (Address) => {
  //   const addressRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  //   return addressRegex.test(Address)
  // }

  useEffect(() => {
    isNickname(Nickname) || (Nickname.length >= 2 && Nickname.length < 11)
      ? setIsNicknameRight(true)
      : setIsNicknameRight(false);
  });
  useEffect(() => {
    isEmail(Email) ? setIsEmailRight(true) : setIsEmailRight(false);
  });
  useEffect(() => {
    {
      isEmail(Email) &&
      (Password.length >= 10 || Password.length < 21) &&
      Password == PasswordConfirm &&
      Nickname.length >= 2 &&
      Nickname.length < 11 &&
      !isNickname(Nickname)
        ? setIsRight(true)
        : setIsRight(false);
    }
  }, [inputs, isRight]);

  // Signup
  const Signup = () => {
    axios({
      method: "post",
      url: "http://j5d204.p.ssafy.io:8000/user/signup",
      data: {
        username: inputs.Email,
        email: inputs.Email,
        password: inputs.Password,
        nickname: inputs.Nickname,
        address: inputs.Address,
        phonenumber: inputs.PhoneNumber,
      },
    })
      .then(() => {
        alert("회원가입 완료!");
        document.location.href = "/Login";
      })
      .catch(() => {});
  };
  // email 유효성검사
  const checkEmail = () => {
    axios({
      method: "post",
      url: "http://j5d204.p.ssafy.io:8000/user/email/uniquecheck",
      //url: 'http://127.0.0.1:8000/user/email/uniquecheck',
      data: {
        email: inputs.Email,
      },
    })
      .then(() => {
        alert("사용가능한 Email입니다.");
      })
      .catch(() => {
        alert("이미 사용중인 Email 입니다.");
      });
  };
  // nickname 유효성검사
  const checkNickname = () => {
    axios({
      method: "post",
      url: "http://j5d204.p.ssafy.io:8000/user/nickname/uniquecheck",
      //url: 'http://127.0.0.1:8000/user/nickname/uniquecheck',
      data: {
        nickname: inputs.Nickname,
      },
    })
      .then(() => {
        alert("사용가능한 Nickname입니다.");
      })
      .catch(() => {
        alert("이미 사용중인 Nickname입니다.");
      });
  };
  // 로그인페이지로 이동

  const Login = () => {
    router.push({
      pathname: "/Login",
    });
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative md:w-2/5 w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Sign Up</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/*Email*/}
              <p className="my-2 text-black-900 text-lg font-bold leading-relaxed">E-mail</p>
              <input
                type="text"
                name="Email"
                onChange={onChange}
                placeholder=" Email"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Email.length != 0 && !isEmail(Email) && (
                <p className="text-red-500">잘못된 이메일 형식입니다.</p>
              )}
              <button
                className={isEmailRight ? `checkbutton_active` : `checkbutton_unactive`}
                type="button"
                onClick={checkEmail}
              >
                중복검사
              </button>
              {/*Password*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Password</p>
              <input
                type="password"
                name="Password"
                onChange={onChange}
                placeholder=" Password"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Password.length != 0 && (Password.length < 10 || Password.length > 20) && (
                <p className="text-red-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>
              )}
              {/*Confirm Password*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
                Confirm Password
              </p>
              <input
                type="password"
                name="PasswordConfirm"
                onChange={onChange}
                placeholder=" Password"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Password != PasswordConfirm && (
                <p className="text-red-500">비밀번호와 동일하게 입력해주세요.</p>
              )}
              {/*Nickname*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Nickname</p>
              <input
                type="text"
                name="Nickname"
                value={Nickname}
                onChange={onChange}
                placeholder=" Nickname"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Nickname.length != 0 && (Nickname.length < 2 || Nickname.length > 11) && (
                <p className="text-red-500">Nickname은 2자이상 10자 이하여야합니다</p>
              )}
              {isNickname(Nickname) && (
                <p className="text-red-500">Nickname은 특수문자를 포함할 수 없습니다.</p>
              )}
              <button
                className={isNicknameRight ? `checkbutton_active` : `checkbutton_unactive`}
                type="button"
                onClick={checkNickname}
              >
                중복검사
              </button>
            </div>
            {/*footer*/}
            <div className="rounded-lg flex flex-col items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div className="mt-2">
                <button
                  className={isRight ? `button_active` : `button_unactive`}
                  type="button"
                  onClick={Signup}
                >
                  Sign Up
                </button>
              </div>
              <div>
                <button
                  className="text-yellow-500 background-transparent border-2 border-yellow-500 rounded-lg font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={Login}
                >
                  이미 계정이 있으신가요?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
