"use client";
import { CircleX, Eye } from "lucide-react";
import { Button } from "../forms/Button";
import { Input } from "../forms/input";
import { use, useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";

export const RegisterModal = ({
  isOpen,
  setIsModalOpen,
  errors,
  register,
  recuperarSenha,
  setValue,
}: any) => {
  const [load, setLoad] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState<any>(false);

  const animationContainer = useRef<any>(null);
  console.log(validated);

  const validate = () => {
    if (typeof window !== "undefined") {
      const storageData = JSON.parse(localStorage.getItem("User") as string);

      if (
        storageData?.find(
          (user: any) =>
            user.email == recuperarSenha.email &&
            user.nascimento == recuperarSenha.nascimento
        )
      ) {
        setValidated(true);
        setError(false);
      } else {
        setError("Usuário não encontrado, preencha corretamente seus dados.");
      }
    }
  };

  useEffect(() => {
    if (load) {
      Lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/Animation.json",
      });
    }
  }, [load]);

  const changePassword = () => {
    if (recuperarSenha.senha.length < 6) {
      return setError(
        "Senha muito curta, insira uma senha com no mínimo 6 caracteres."
      );
    } else {
      if (typeof window !== "undefined") {
        const storageData = JSON.parse(localStorage.getItem("User") as string);
        const userIndex = storageData.findIndex(
          (user: any) => user.email == recuperarSenha.email
        );
        storageData[userIndex].senha = recuperarSenha.senha;
        localStorage.setItem("User", JSON.stringify(storageData));
        setValue("login", {
          email: recuperarSenha.email,
          senha: recuperarSenha.senha,
        });

        setLoad(true);
      }
    }
  };

  return (
    <div
      className={`w-screen fixed ${
        isOpen ? "" : "hidden"
      } h-screen bg-black/75 z-10 top-0 backdrop-blur-sm flex justify-center items-center `}
    >
      <div className="w-1/2 relative bg-white border-[--button-color]  rounded-lg px-5 py-5  h-2/3 border-2 gap-5  flex flex-col justify-center items-center">
        <h1 className="text-3xl text-[--button-color] font-semibold top-7 absolute">
          {!load ? "Recuperação de Senha" : "Senha Alterada Com sucesso!"}
        </h1>
        <div
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-3 cursor-pointer transition-all text-[--button-color] hover:text-red-500"
        >
          <CircleX size={30} />
        </div>
        <div
          ref={animationContainer}
          className={`flex flex-col w-2/3 justify-center items-center`}
        >
          {!load && (
            <>
              <div
                className={`flex flex-col justify-center items-center w-full border-2 border-[--border-light] gap-4 px-5 py-5 `}
              >
                <div className="flex flex-col w-full">
                  <span className="text-lg font-semibold ">
                    Esqueceu sua senha?
                  </span>
                  <span className="text-sm text-[--text-color]">
                    Insira seu email e data de nascimento para recuperá-la.
                  </span>
                </div>
                <Input
                  register={register}
                  errors={errors}
                  fieldId={{ parent: "recuperarSenha", id: "email" }}
                  type={"text"}
                  placeholder={"Digite seu E-mail"}
                  label={"E-mail"}
                />

                <div className="flex flex-col w-full relative mb-6">
                  <span className="font-semibold text-base">
                    Data de nascimento *
                  </span>
                  <input
                    type="date"
                    max="9999-01-01"
                    className="w-full h-12 px-4  placeholder:text-base rounded  focus:outline-none  border-[1px] border-[--inputs-border] "
                    {...register("recuperarSenha.nascimento")}
                  />
                </div>
                <Button
                  onClick={() => {
                    validate();
                  }}
                  style="outlined"
                  label="Confirmar"
                />
              </div>

              {validated && (
                <div className="w-full flex flex-col mt-5 gap-3  ">
                  <Input
                    type="password"
                    placeholder="Digite sua nova senha"
                    register={register}
                    errors={errors}
                    fieldId={{ parent: "recuperarSenha", id: "senha" }}
                    label={"Nova Senha"}
                  />
                  <Button onClick={changePassword} label="Redefinir Senha" />
                </div>
              )}
              {error && (
                <span className="text-red-500 mt-2 text-sm w-full text-center">
                  {error}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
