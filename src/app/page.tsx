"use client";
import React, { use, useEffect } from "react";

import { useState } from "react";
import { Button } from "./components/forms/Button";
import { Input } from "./components/forms/input";
import { RegisterModal } from "./components/modal/RegisterModa";
import { LogIn } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const flexColStyle = " flex flex-col justify-center items-center ";

const inputsZodSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(6, "Minimo de 6 caracteres"),
});

const registerInputsZodSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }).optional(),
    senha: z.string().min(6, "Minimo de 6 caracteres").optional(),
    nascimento: z.string().min(10, "Preencha corretamente"),
  })
  .optional();

const forgotPasswordInputsZodSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }).optional(),
    senha: z.string().min(6, "Minimo de 6 caracteres").optional(),
    nascimento: z.string().min(10, "Preencha corretamente"),
  })
  .optional();

const zodSchema = z.object({
  login: inputsZodSchema,
  cadastro: registerInputsZodSchema,
  recuperarSenha: forgotPasswordInputsZodSchema,
});

export default function Page() {
  const [userError, setUserError] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
  });
  console.log(watch());

  let {
    login: loginValues,
    cadastro: registerValues,
    recuperarSenha,
  } = watch();

  console.log(errors);

  const onSubmit = () => {
    if (!errors.login && loginValues) {
      if (typeof window !== "undefined") {
        const storedUsers = JSON.parse(
          window?.localStorage.getItem("User") as string
        );
        const isRegistered = storedUsers?.find((user: any) => {
          return (
            user.email == loginValues?.email && user.senha == loginValues?.senha
          );
        });
        if (isRegistered) {
          window?.localStorage.setItem(
            "actualUser",
            JSON.stringify(loginValues)
          );

          window.location.href = "/HomePage";
        } else {
          setUserError("Usuário não existe ou a senha incorreta");
        }
      }
    }
  };

  // console.log(inputsData);
  console.log("errors", errors);

  const registerFunc = () => {
    if (!errors.cadastro && registerValues) {
      const valoresCadastro = {
        email: registerValues.email,
        senha: registerValues.senha,
      };

      if (typeof window !== "undefined") {
        if (window?.localStorage.getItem("User")) {
          const data = JSON.parse(
            window?.localStorage.getItem("User") as string
          );

          if (
            !data?.find((user: any) => user?.email === registerValues?.email)
          ) {
            data.push({ ...registerValues, cart: [], favorites: [] });
            window?.localStorage.setItem("User", JSON.stringify(data));
            setUserError(
              "Usuário cadastrado com sucesso! Faça o login para continuar"
            );
            reset();
            setValue("login", valoresCadastro as any);
          } else {
            setUserError("Usuário já existe");
          }
        } else {
          window?.localStorage.setItem(
            "User",
            JSON.stringify([{ ...registerValues, cart: [], favorites: [] }])
          );
          setUserError(
            "Usuário cadastrado com sucesso! Faça o login para continuar"
          );
          reset();
          setValue("login", valoresCadastro as any);
        }
      }
    }
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col text-[--text-color] gap-6 justify-center items-center`}
    >
      <img
        className="h-40 w-48"
        src="https://www.amigao.com/media/logo/stores/1/logo-festa-junina.png"
        alt=""
      />
      <div className="flex flex-col justify-center gap-6 items-center">
        <h1 className="text-4xl ">Bem vindo!</h1>
        <div className=" text-2xl flex  gap-4  ">
          Realize o Login abaixo para realizar suas compras!
          <LogIn strokeWidth={1.2} size={30} />
        </div>
      </div>
      <form
        className={`h-[50vh] mb-20 gap-10 min-w-[450px] w-full flex flex-row justify-center items-center `}
      >
        <RegisterModal
          setValue={setValue}
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          errors={errors.recuperarSenha}
          recuperarSenha={recuperarSenha}
          register={register}
        />
        <div
          className={`${flexColStyle} h-[75%] w-1/3 gap-4 px-5 py-5 border-2 border-[--border-light] `}
        >
          <div className="flex flex-col w-full">
            <span className="text-lg font-semibold ">Já sou cliente</span>
            <span className="text-sm text-[--text-color]">
              Entre agora mesmo com seu e-mail e senha.
            </span>
          </div>
          {
            <Input
              register={register}
              fieldId={{ parent: "login", id: "email" }}
              errors={errors.login}
              type={"text"}
              placeholder={"Digite seu E-mail"}
              label={"E-mail"}
            />
          }
          <div className="w-full gap-1 flex flex-col justify-center items-center">
            {
              <Input
                register={register}
                fieldId={{ parent: "login", id: "senha" }}
                errors={errors.login}
                type={"password"}
                placeholder={"Digite sua Senha"}
                label={"Senha"}
              />
            }
            <div className="w-full  ">
              <p
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="text-[--button-color] w-40 text-sm underline cursor-pointer"
              >
                Esqueceu sua senha?
              </p>
            </div>
          </div>
          <div
            className={`${flexColStyle} w-full text-white text-lg font-semibold gap-4`}
          >
            <Button
              onClick={handleSubmit(onSubmit, () => {
                setError("cadastro.email", {});
                setError("cadastro.senha", {});
                setError("cadastro.nascimento", {});
                setError("recuperarSenha.email", {});

                onSubmit();
              })}
              label="Entrar"
            />
          </div>
        </div>
        <div className="w-1/3 h-[75%]">
          <div
            className={`${flexColStyle} w-full border-2 border-[--border-light] gap-4 px-5 py-5 `}
          >
            <div className="flex flex-col w-full">
              <span className="text-lg font-semibold ">Não sou cliente</span>
              <span className="text-sm text-[--text-color]">
                Informe seu e-mail, escolha sua melhor senha e preencha sua data
                de nascimento.
              </span>
            </div>
            <Input
              register={register}
              errors={errors.cadastro}
              fieldId={{ parent: "cadastro", id: "email" }}
              type={"text"}
              placeholder={"Digite seu E-mail"}
              label={"E-mail"}
            />
            <Input
              register={register}
              fieldId={{ parent: "cadastro", id: "senha" }}
              errors={errors.cadastro}
              type={"password"}
              placeholder={"Digite sua nova Senha"}
              label={"Senha"}
            />
            <div className="flex flex-col w-full relative mb-6">
              <span className="font-semibold text-base">
                Data de nascimento *
              </span>
              <input
                type="date"
                max="9999-01-01"
                className="w-full h-12 px-4  placeholder:text-base rounded  focus:outline-none  border-[1px] border-[--inputs-border] "
                {...register("cadastro.nascimento")}
              />
              {errors && errors?.cadastro?.nascimento && (
                <span className="absolute top-[73px] text-red-500 right-0 text-sm">
                  {errors?.cadastro?.nascimento?.message as string}
                </span>
              )}
            </div>
            <Button
              onClick={handleSubmit(
                () => {},
                () => {
                  setError("login.email", {});
                  setError("login.senha", {});
                  setError("recuperarSenha.senha", {});

                  registerFunc();
                }
              )}
              style="outlined"
              label="Cadastrar"
            />
          </div>
        </div>
      </form>
      {userError && (
        <span
          className={` absolute top-[38%] ${
            userError.includes("continuar")
              ? "text-green-600 font-semibold text-xl"
              : "text-red-500 "
          }  text-sm`}
        >
          {userError as string}
        </span>
      )}
    </div>
  );
}
