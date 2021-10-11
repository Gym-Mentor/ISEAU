import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as userAction from "../store/modules/user";
const ModifyUser = () => {
  const [isNicknameRight, setIsNicknameRight] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("is_login");
    axios({
      method: "get",
      url: "http://j5d204.p.ssafy.io:8000/user/current",
      headers: `JWT ${token}`,
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  });

  const em = useSelector((state) => state.user.username);
  const nn = useSelector((state) => state.user.nickname);
  const it = useSelector((state) => state.user.introduce);

  const [isRight, setIsRight] = useState(false);

  // Nickname 유효성검사 특수문자 불가
  const isNickname = (Nickname) => {
    const nicknameRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    return nicknameRegex.test(Nickname);
  };

  const checkNickname = () => {
    axios({
      method: "post",
      url: "http://j5d204.p.ssafy.io:8000/user/nickname/uniquecheck",
      data: {
        nickname: userInfo.nickname,
      },
    })
      .then(() => {
        alert("사용가능한 Nickname입니다.");
      })
      .catch((err) => {
        alert("이미 사용중인 Nickname입니다.");
        console.log(err);
      });
  };

  // image 넣기
  const { user } = useSelector((state) => ({ user: state.user }));
  const [userInfo, SetUserInfo] = useState({
    nickname: "",
    password: "",
    passwordcheck: "",
    introduce: "",
    profileImg: "",
  });

  useEffect(() => {
    {
      (userInfo.password.length >= 10 || userInfo.password.length < 21) &&
      userInfo.nickname.length >= 2 &&
      userInfo.nickname.length < 11 &&
      userInfo.password == userInfo.passwordcheck &&
      !isNickname(userInfo.nickname)
        ? setIsRight(true)
        : setIsRight(false);
    }
  }, [userInfo, isRight]);
  // nickname 유효성검사
  useEffect(() => {
    isNickname(userInfo.nickname) ||
    (userInfo.nickname.length >= 2 && userInfo.nickname.length < 11)
      ? setIsNicknameRight(true)
      : setIsNicknameRight(false);
  });
  const [file, setFile] = useState("");

  const onNameChange = (e) => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.nickname = e.target.value;
    SetUserInfo(newUserInfo);
  };

  const onIntroChange = (e) => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.introduce = e.target.value;
    SetUserInfo(newUserInfo);
  };

  const onPwChange = (e) => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.password = e.target.value;
    SetUserInfo(newUserInfo);
  };
  const onCheckChange = (e) => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.passwordcheck = e.target.value;
    SetUserInfo(newUserInfo);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // 백엔드에 넘겨주는 실제파일
      setFile(file);
      // 임시로 담고있는 유저정보의 image 수정
      let newUserInfo = Object.assign({}, userInfo);
      newUserInfo.profileImg = file;
      SetUserInfo(newUserInfo);
    };
    reader.readAsDataURL(file);
  };

  // modify Request
  const Modify = () => {
    let result = confirm("회원정보를 변경하시겠습니까?");
    if (result == true) {
      const token = sessionStorage.getItem("is_login");
      const id = sessionStorage.getItem("id");

      const formData = new FormData();

      formData.append("profileimg", userInfo.profileImg);
      formData.append("password", userInfo.password);
      formData.append("nickname", userInfo.nickname);
      formData.append("introduce", userInfo.introduce);

      for (const element of formData) {
        console.log(element);
      }
      axios({
        method: "put",
        url: "http://j5d204.p.ssafy.io:8000/user/modify/" + id,
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization": `JWT ${token}`,
          Authorization: "JWT " + token,
        },
        data: formData,
      })
        .then(() => {
          router.push({
            pathname: "/",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const Delete = () => {
    let result = confirm("회원정보를 삭제하시겠습니까?");
    if (result == true) {
      const token = sessionStorage.getItem("is_login");
      const id = sessionStorage.getItem("id");
      axios({
        method: "delete",
        url: "http://j5d204.p.ssafy.io:8000/user/delete/" + id,
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then(() => {
          sessionStorage.removeItem("is_login");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("pw");
          alert("삭제가 완료되었습니다.");

          location.href("/");
        })
        .catch(() => {});
    }
  };

  const router = useRouter();
  // 취소버튼
  const Login = () => {
    sessionStorage.removeItem("pw");
    router.push({
      pathname: "/",
    });
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modify</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/*profileImage*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Profile Image</p>
              <input
                type="file"
                name="profileimg"
                id="profileimg"
                className=""
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={handleImageUpload}
              />
              {/*Email*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">E-mail</p>
              {/* <input type="text" name="Email" disabled onChange={onEmailChange}  className="text-lg w-full rounded-lg border-2 border-gray-400" /> */}
              <p>{em}</p>
              {/*Password*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Password</p>
              <input
                type="password"
                name="Password"
                onChange={onPwChange}
                placeholder=""
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {userInfo.password.length != 0 &&
                (userInfo.password.length < 10 || userInfo.password.length > 20) && (
                  <p className="text-gray-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>
                )}
              {/*Confirm Password*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
                Check Password
              </p>
              <input
                type="password"
                name="passwordcheck"
                onChange={onCheckChange}
                placeholder=" Password"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {userInfo.password != userInfo.passwordcheck && (
                <p className="text-red-500">비밀번호와 동일하게 입력해주세요.</p>
              )}
              {/*Nickname*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Nickname</p>
              <input
                type="text"
                name="Nickname"
                onChange={onNameChange}
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {userInfo.nickname.length != 0 &&
                (userInfo.nickname.length < 2 || userInfo.nickname.length > 10) && (
                  <p className="text-gray-500">Nickname은 2자이상 10자 이하여야합니다</p>
                )}
              {isNickname(userInfo.nickname) && (
                <p className="text-red-500">Nickname은 특수문자를 포함할 수 없습니다.</p>
              )}
              <button
                className={isNicknameRight ? `checkbutton_active` : `checkbutton_unactive`}
                type="button"
                onClick={checkNickname}
              >
                중복검사
              </button>

              {/*Introduce*/}
              <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Introduce</p>
              <input
                type="text"
                name="introduce"
                onChange={onIntroChange}
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
            </div>
            {/*footer*/}
            <div className="rounded-lg flex flex-col items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div>
                <button
                  className="text-gray-500 w-52 border-gray-500 rounded-xl font-bold uppercase px-6 py-2 text-sm  mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={Login}
                >
                  취소
                </button>
              </div>
              <div className="mt-2">
                <button
                  className={isRight ? `button_active` : `button_unactive`}
                  type="button"
                  onClick={Modify}
                >
                  변경
                </button>
              </div>
              <div className="mt-2">
                <button
                  className="text-gray-300 bg-red-500 w-52 font-bold uppercase px-6 py-2 text-sm border-2 rounded-xl border-red-300 focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={Delete}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyUser;
