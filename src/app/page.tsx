"use client";
import React from "react";

import { useState } from "react";
import { Button } from "./components/forms/Button";
import { Input } from "./components/forms/input";
import { RegisterModal } from "./components/modal/RegisterModa";
import { LogIn } from "lucide-react";

export default function Page() {
  const [errors, setErrors] = useState({ email: false, senha: false });
  const [inputsData, setInputsData] = useState<any>({
    email: "",
    senha: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const loginBoxFormStyles =
    "h-1/2 min-w-1/3 w-[40%] max-1/3 border-2 border-white/75";

  const flexStyle = "w-full flex flex-col justify-center items-center ";

  const onChangeInputs = (e: any, id: string) => {
    if (e !== "") {
      setErrors((prev: any) => {
        return {
          ...prev,
          [id]: false,
        };
      });
    }

    setInputsData((prevData: any) => {
      return {
        ...prevData,
        [id]: e,
      };
    });
  };

  document.body.addEventListener("keydown", (e: any) => {
    if (e.key == "Enter") {
      onSubmit();
    }
  });

  const onSubmit = () => {
    if (
      Object.values(inputsData).length > 1 &&
      !Object.values(inputsData).includes("")
    ) {
      const storedUsers = JSON.parse(
        global?.window?.localStorage.getItem("User") as string
      );
      const isRegistered = storedUsers.map((user: any) => {
        if (user.nome == inputsData.nome && user.senha == inputsData.senha) {
          return true;
        }
      });
      console.log(isRegistered);
      if (isRegistered.includes(true)) {
        global?.window?.localStorage.setItem(
          "actualUser",
          JSON.stringify(inputsData)
        );

        window.location.href = "/HomePage";
      } else {
        setErrors((prev: any) => {
          return {
            ...prev,
            senha: "Usuario nao existe ou senha incorreta",
          };
        });
      }
    } else {
      if (inputsData.senha == "") {
        setErrors((prev: any) => {
          return {
            ...prev,
            senha: true,
          };
        });
      }
      if (inputsData.email == "") {
        setErrors((prev: any) => {
          return {
            ...prev,
            email: true,
          };
        });
      }
    }
  };

  console.log(inputsData);

  const register = () => {
    if (
      Object.values(inputsData).length > 1 &&
      !Object.values(inputsData).includes("")
    ) {
      if (global?.window?.localStorage.getItem("User")) {
        const data = JSON.parse(
          global?.window?.localStorage.getItem("User") as string
        );
        if (
          data
            .map((dat: any) => {
              console.log("log", dat, inputsData);
              if (dat.email === inputsData.email) {
                return true;
              }
            })
            .includes(true)
        ) {
          setErrors((prev: any) => {
            return {
              ...prev,
              senha: "Usuario ja existe tente fazer o login",
            };
          });

          return;
        }
        data.push(inputsData);
        global?.window?.localStorage.setItem("User", JSON.stringify(data));
        setIsOpenModal(false);
        setInputsData({ email: "", senha: "" });
      } else {
        global?.window?.localStorage.setItem(
          "User",
          JSON.stringify([inputsData])
        );
        setIsOpenModal(false);
        setInputsData({ email: "", senha: "" });
      }
    } else {
      if (inputsData.senha == "") {
        setErrors((prev: any) => {
          return {
            ...prev,
            senha: true,
          };
        });
      }
      if (inputsData.email == "") {
        setErrors((prev: any) => {
          return {
            ...prev,
            email: true,
          };
        });
      }
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const inputsSchema = [
    { label: "email", type: "text", placeholder: "insira seu email" },
    { label: "senha", type: "password", placeholder: "insira seu Senha" },
  ];

  return (
    <div
      className={`w-screen h-screen flex flex-col gap-6 justify-center items-center`}
    >
      <RegisterModal
        errors={errors}
        setIsOpenModal={setIsOpenModal}
        inputsSchema={inputsSchema}
        inputsData={inputsData}
        onChangeInputs={onChangeInputs}
        onSubmit={register}
        isOpen={isOpenModal}
      />
      <div className="flex flex-row justify-center gap-4 items-center">
        <h1 className="text-4xl">LOGIN</h1>
        <LogIn size={35} />
      </div>
      <form
        className={`${loginBoxFormStyles} flex flex-col justify-center items-center `}
      >
        <div className={`${flexStyle} ${!isOpenModal ? "" : "hidden"}`}>
          {inputsSchema.map((schema: any, index: number) => {
            return (
              <Input
                key={index}
                onChange={onChangeInputs}
                value={inputsData?.[schema.label]}
                required={true}
                errors={errors}
                type={schema.type}
                placeholder={schema.placeholder}
                label={schema.label}
              />
            );
          })}
        </div>
        <div className={`${flexStyle} gap-4`}>
          <Button onClick={onSubmit} label="Entrar" />

          <Button onClick={openModal} style="outlined" label="Me cadastrar" />
        </div>
      </form>
    </div>
  );
}
