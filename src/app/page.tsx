"use client";
import React from "react";

import { useState } from "react";
import { Button } from "./components/forms/Button";
import { Input } from "./components/forms/input";
import { useRouter } from "next/navigation";
import { RegisterModal } from "./components/RegisterModa";

export default function page() {
  const loginBoxFormStyles =
    "h-1/2 min-w-1/3 w-[40%] max-1/3 border-2 border-white/75";

  const flexStyle = "w-full flex flex-col justify-center items-center ";

  const router = useRouter();

  interface inputsDataDTO {
    email: string;
    senha: string;
  }

  const [inputsData, setInputsData] = useState<any>({
    email: "",
    senha: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const onChangeInputs = (e: any, id: string) => {
    setInputsData((prevData: any) => {
      return {
        ...prevData,
        [id]: e,
      };
    });
  };

  const onSubmit = () => {
    if (
      Object.values(inputsData).length > 1 &&
      !Object.values(inputsData).includes("")
    ) {
      const storedUsers = JSON.parse(localStorage.getItem("User") as string);
      const isRegistered = storedUsers.map((user: any) => {
        if (user.nome == inputsData.nome && user.senha == inputsData.senha) {
          return true;
        }
      });
      console.log(isRegistered);
      if (isRegistered.includes(true)) {
        window.location.href = "/HomePage";
      } else window.alert("tem nao fi");
    }
  };

  console.log(inputsData);

  const register = () => {
    if (
      Object.values(inputsData).length > 1 &&
      !Object.values(inputsData).includes("")
    ) {
      if (localStorage.getItem("User")) {
        const data = JSON.parse(localStorage.getItem("User") as string);
        data.push(inputsData);
        localStorage.setItem("User", JSON.stringify(data));
        setIsOpenModal(false);
        setInputsData({ email: "", senha: "" });
      } else {
        localStorage.setItem("User", JSON.stringify([inputsData]));
        setIsOpenModal(false);
        setInputsData({ email: "", senha: "" });
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
    <div className="w-screen  h-screen flex flex-col gap-6 justify-center items-center">
      <RegisterModal
        setIsOpenModal={setIsOpenModal}
        inputsSchema={inputsSchema}
        inputsData={inputsData}
        onChangeInputs={onChangeInputs}
        onSubmit={register}
        isOpen={isOpenModal}
      />

      <h1 className="text-4xl">LOGIN</h1>
      <form
        className={`${loginBoxFormStyles} flex flex-col justify-center items-center `}
      >
        <div className={`${flexStyle}`}>
          {inputsSchema.map((schema: any, index: number) => {
            return (
              <Input
                key={index}
                onChange={onChangeInputs}
                value={inputsData?.[schema.label]}
                required={true}
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
