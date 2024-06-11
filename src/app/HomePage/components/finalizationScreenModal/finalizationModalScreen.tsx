import { Button } from "@/app/components/forms/Button";
import { formatCurrencyText } from "@/app/helpers/formatCurrencyText";
import { useGetStorageData } from "@/app/helpers/useGetStorageData";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Minus, Plus, Trash2, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FinalizationModal = ({
  cartItems,
  setCartItems,
  setIsFinalizationOpen,
  isFinalizationOpen,
  close,
}: any) => {
  const [actualStage, setActualStage] = useState<number>(1);
  const { setRefresh, loading } = useGetStorageData();

  const formatPhoneText = (value: string) => {
    const phoneNumber = value; // <-- nº de celular não formatado
    return phoneNumber
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const schema = z.object({
    endereco: z.string().min(1, "Preencha corretamente"),
    cep: z.string().min(1, "Preencha corretamente"),
    cidade: z.string().min(1, "Preencha corretamente"),
    estado: z.string().min(1, "Preencha corretamente"),
    numero: z.string().min(1, "Preencha corretamente"),
    telefone: z.string().min(1, "Preencha corretamente"),
  });

  const {
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const totalAllValue = () => {
    return formatCurrencyText(
      String(
        cartItems
          ?.reduce((acc: any, el: any) => {
            const precoStr = el.preco.replace("R$", "").replace(",", ".");
            acc += Number(precoStr) * el.quantity;
            return acc;
          }, 0)
          .toFixed(2)
      )
    );
  };
  console.log(totalAllValue());

  console.log(errors);

  useEffect(() => {
    setRefresh(true);
  }, [isFinalizationOpen]);

  const stages = [
    "Validação dos dados",
    "Endereço de Entrega",
    "Pagamento",
    "Finalização",
  ];
  const nextStage = () => {
    if (actualStage < stages?.length - 1) {
      setActualStage(actualStage + 1);
    }
  };

  const previousStage = () => {
    if (actualStage > 0) {
      setActualStage(actualStage - 1);
    }
  };

  const lessQuant = (id: string) => {
    if (setCartItems) {
      setCartItems((prev: any) => {
        console.log(prev);

        const newData = prev?.map((el: any) => {
          if (String(el.id) === String(id) && el.quantity > 1) {
            return { ...el, quantity: el.quantity - 1 };
          } else return el;
        });
        console.log(newData);
        return newData;
      });
      if (setRefresh) {
        setRefresh(true);
      }
    }
  };
  const moreQuant = (id: string) => {
    if (setCartItems) {
      setCartItems((prev: any) => {
        const newData = prev?.map((el: any) => {
          if (String(el.id) === String(id)) {
            return { ...el, quantity: el.quantity + 1 };
          } else return el;
        });
        return newData;
      });
    }
    if (setRefresh) {
      setRefresh(true);
    }
  };

  const onChangeInputQuant = (e: any) => {
    setCartItems((prev: any) => {
      const newData = prev.map((el: any) => {
        if (String(el.id) === String(e.target.name)) {
          return { ...el, quantity: e.target.value };
        } else return el;
      });
      return newData;
    });
    if (setRefresh) {
      setRefresh(true);
    }
  };

  const excludeItem = (id: string) => {
    setCartItems((prev: any) => {
      return prev?.filter((elem: any) => String(elem?.id) !== String(id));
    });
    if (setRefresh) {
      setRefresh(true);
    }
  };

  const totalValue = (preco: string, quantity: number) => {
    const precoStr = preco.replace("R$", "").replace(",", ".");
    return formatCurrencyText(String((Number(precoStr) * quantity).toFixed(2)));
  };

  const stage1 = () => {
    return (
      <div className="overflow-y-auto w-full h-auto min-h-full text-[--text-color] flex flex-col justify-center items-center">
        <h1 className="w-full">Carrinho</h1>
        <div className="w-full flex flex-col h-auto py-5">
          <div className="flex bg-[--border-light] h-16 justify-center items-center pr-14 pl-4">
            <span className="w-[55%]">Item</span>
            <span className="w-[20%] text-center">Qtd</span>
            <span className="w-[23%] text-center ">Sub-total</span>
          </div>
        </div>
        <div className="h-[35vh] w-full overflow-auto">
          <div className="w-full flex flex-col  pb-16 ">
            {cartItems?.map((elem: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`${
                    index == cartItems?.length - 1
                      ? "border-b-[1px]"
                      : "border-b-0 "
                  } flex border-[1px] relative bg-white pr-10 h-28  border-[--inputs-border]  justify-center items-center`}
                >
                  <img className="w-20 h-20" src={elem.img} alt="" />
                  <div className="flex flex-col h-16 gap-2 w-[55%]">
                    <span className=" text-sm font-semibold text-[--text-dark]">
                      {elem.nome}
                    </span>
                    <span className=" text-sm font-medium">{elem.preco}</span>
                  </div>
                  <div className=" z-0 w-48 p-0.5 h-12 rounded border-[1px] border-[--inputs-border] flex justify-center items-center">
                    <button
                      onClick={() => lessQuant(elem?.id)}
                      className="h-full hover:text-black/75 hover:bg-[#e5e7eb] rounded-md border-[1px] border-transparent transition-all  text-[#e5e7eb]  w-20 flex justify-center items-center"
                    >
                      <Minus />
                    </button>
                    <input
                      value={elem?.quantity}
                      name={elem?.id}
                      onChange={(e) => onChangeInputQuant(e)}
                      className="w-full focus:outline-none text-center"
                    />

                    <button
                      onClick={() => moreQuant(elem?.id)}
                      className="h-full z-40 hover:bg-[#e5e7eb] border-[1px] rounded-md border-transparent hover:text-black/75 transition-all text-[#e5e7eb] w-20 flex justify-center items-center"
                    >
                      <Plus />
                    </button>
                  </div>
                  <span className="w-[27%] text-center ">
                    {totalValue(elem.preco, elem.quantity)}
                  </span>
                  <span
                    onClick={() => excludeItem(elem.id)}
                    className="absolute right-8 text-[--text-color2] hover:text-[--button-color] cursor-pointer"
                  >
                    <Trash2 />
                  </span>
                </div>
              );
            })}
            <div className="w-full h-36 b flex justify-between items-center px-2  mt-2">
              <div className="w-1/3">
                <Button label="Limpar carrinho" />
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <div className="w-full relative ">
                  <span className=" w-full text-center absolute top-[-27px]">
                    Valor total da Compra
                  </span>

                  <div className="w-full h-12 border-[1px] flex justify-center items-center border-[--inputs-border]">
                    <span className=" text-red-600 text-xl font-semibold">
                      {totalAllValue()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const stage2 = () => {
    console.log(watch());
    return (
      <form
        onSubmit={handleSubmit(nextStage)}
        className=" w-full h-[50vh] justify-center items-center flex"
      >
        <button
          type="submit"
          className="fixed w-[13%] bottom-[157px] right-[552px]  h-12 cursor-pointer"
        />
        <div className="h-[70%] gap-14 flex flex-col justify-center items-center w-[80%]">
          <h1 className="text-xl font-semibold text-[--text-color3]">
            Insira os dados para a entrega
          </h1>
          <div className="w-full h-3/4 grid gap-y-7 grid-cols-2">
            <div className="flex relative flex-col gap-1 px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                Endereço de entrega
              </label>
              <input
                type="text"
                {...register("endereco")}
                placeholder="Digite o endereco"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.endereco && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.endereco.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                CEP
              </label>
              <input
                type="text"
                {...register("cep")}
                placeholder="Digite o cep"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.cep && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors.cep.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                Cidade
              </label>
              <input
                type="text"
                {...register("cidade")}
                placeholder="Digite a cidade"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.cidade && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.cidade.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                Estado
              </label>
              <input
                type="text"
                {...register("estado")}
                placeholder="Digite o estado"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.estado && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.estado.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                Numero
              </label>
              <input
                type="text"
                {...register("numero")}
                placeholder="Digite o numero do endereco"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.numero && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.numero.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-[--text-color] ">
                Numero de telefone
              </label>
              <input
                value={formatPhoneText(String(watch("telefone")))}
                type="text"
                {...register("telefone")}
                placeholder="Digite o numero de telefone"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-12"
              />
              {errors.telefone && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.telefone.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    );
  };

  const stage3 = () => {};

  const stagesContent = [stage1(), stage2()];

  return (
    <div
      className={`${
        isFinalizationOpen ? "" : "hidden"
      } w-screen  h-screen left-0 z-50 overflow-hidden fixed flex justify-center items-center bg-black/50`}
    >
      <div className="h-[75%]  w-[60%] border-4 border-[#203669] flex items-center justify-center flex-col bg-[--background] rounded-[25px] relative">
        <div className="absolute z-40 hover:text-red-500 transition-all  top-5 right-5">
          <CircleX
            onClick={() => {
              setIsFinalizationOpen(false);
              document.body.style.overflowY = "unset";
              close(false);
              setRefresh(true);
            }}
            size={30}
            className="cursor-pointer"
          />
        </div>
        {!loading ? (
          <>
            <div className="w-[70%] flex absolute bottom-8 justify-between  ">
              <button
                onClick={previousStage}
                className={`w-60 h-12 rounded-lg ${
                  stages[actualStage - 1] ? "" : "opacity-65 cursor-not-allowed"
                } text-[#203669]  font-bold border-4 border-[#203669]`}
              >
                Voltar
              </button>
              <button
                onClick={nextStage}
                className={`h-12 w-60  rounded-lg  hover:bg-white transition-all duration-300 hover:text-[#203669] hover:border-[#203669] border-4 border-transparent text-white text-base  font-bold  bg-[#203669]`}
              >
                Avançar
              </button>
            </div>
            <div className="flex gap-6  justify-center items-center absolute  top-5 w-full">
              {stages?.map((stage: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-auto flex justify-center items-center"
                  >
                    <div
                      className={`h-14 w-14  font-bold ${
                        index == actualStage
                          ? "text-[#e7252b] "
                          : "text-black opacity-50"
                      } text-3xl flex justify-center border-4 border-[#203669] rounded-[50%] bg-white items-center`}
                    >
                      <span>{index + 1}</span>
                    </div>
                    {index == actualStage && (
                      <span className="border-4 font-semibold text-[#203669] border-l-0 translate-x-[-10px] border-[#203669] flex justify-center items-center h-10 w-52 px-4 rounded-e-full rounded-[10%]">
                        {stage}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-[80%] h-2/3 ">{stagesContent[actualStage]}</div>
          </>
        ) : (
          <div className="h-40 w-40 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
        )}
      </div>
    </div>
  );
};
