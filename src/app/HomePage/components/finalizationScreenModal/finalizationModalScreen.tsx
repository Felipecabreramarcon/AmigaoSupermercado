import { Button } from "@/app/components/forms/Button";
import { addOrder } from "@/app/helpers/addOrder";
import { formatCurrencyText } from "@/app/helpers/formatCurrencyText";
import { useGetStorageData } from "@/app/helpers/useGetStorageData";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-web";
import {
  CircleX,
  CreditCard,
  FilePenLine,
  Minus,
  Plus,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

export const FinalizationModal = ({
  cartItems,
  setCartItems,
  setIsFinalizationOpen,
  isFinalizationOpen,
  close,
}: any) => {
  const [actualStage, setActualStage] = useState<number>(0);
  const { setRefresh, loading, storageData } = useGetStorageData();

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
    metodoEntrega: z.string().min(1, "Preencha corretamente"),
    metodoPagamento: z.string().min(1, "Preencha corretamente"),
  });

  const {
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof schema | any>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("metodoPagamento", "Cartão");
  }, []);
  const { metodoPagamento } = watch();

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
      <div className="overflow-y-auto w-full h-[60vh] min-h-full text-[--text-color] flex flex-col justify-center items-center">
        <h1 className="w-full">Carrinho</h1>
        <div className="w-full flex flex-col h-auto py-5">
          <div className="flex bg-[--border-light] h-16 justify-center items-center pr-14 pl-4">
            <span className="w-[55%]">Item</span>
            <span className="w-[20%] text-center">Qtd</span>
            <span className="w-[23%] text-center ">Sub-total</span>
          </div>
        </div>
        <div className="h-[35vh] w-full overflow-auto">
          <div className="w-full flex flex-col  pb-4 ">
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

  const verifyCardData = () => {
    if (watch("metodoPagamento") === "Cartão") {
      if (watch("nomeTitular").length < 10) {
        setError("nomeTitular", { message: "Minimo 10 caracteres" });
      }
      if (watch("cvv").length < 3) {
        setError("cvv", { message: "Preencha corretamente" });
      }
      if (watch("cpf").length < 13) {
        setError("cpf", { message: "Preencha corretamente" });
      }
      if (watch("numeroCartao").length < 16) {
        setError("numeroCartao", { message: "Preencha corretamente" });
      }
      if (watch("validade").length < 1) {
        setError("validade", { message: "Preencha corretamente" });
      }
      if (watch("bandeira")?.length < 1) {
        setError("bandeira", { message: "Preencha corretamente" });
      }
      if (
        watch("nomeTitular").length >= 10 &&
        watch("cvv").length > 3 &&
        watch("cpf").length >= 13 &&
        watch("numeroCartao").length > 16 &&
        watch("validade").length > 1 &&
        watch("bandeira")?.length > 1
      ) {
        nextStage();
      }
    }
  };

  const onSubmit = (zodData: any) => {
    console.log("entrei");
    if (zodData.metodoPagamento === "Boleto") {
      nextStage();
    } else {
      verifyCardData();
    }
  };

  function formatarNumeroCartaoCredito(valor: string) {
    // Remova caracteres não numéricos
    const valorNumerico = String(valor.replace(/\D/g, ""));

    return valorNumerico
      .split("")
      .reduce((acc: string, act: any, index: number) => {
        if (index === 16) {
          return acc;
        }
        if (index % 4 === 0 && index !== 0) {
          acc += " " + act;
        } else {
          acc += act;
        }
        return acc;
      }, "");
  }

  const formatCpfText = (value: string) => {
    const cpf = value;
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const stage2 = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit, verifyCardData)}
        className=" w-full gap-10  h-[60vh]  justify-center items-center flex"
      >
        <button
          type="submit"
          className="fixed w-[13%] bottom-[108px] right-[549px]  h-12 cursor-pointer"
        />
        <div className="h-full  gap-2 bg-white  border-[1px] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)]  flex flex-col justify-center items-center w-[40%]">
          <div className="w-full justify-center items-center h-24 py-5 gap-5 flex px-4 border-b-[1px] text-center text-lg  font-semibold">
            <div className=" flex justify-center items-center">
              <FilePenLine size={30} />
            </div>
            <h1 className="text-xl">Dados do endereço</h1>
          </div>
          <div className="w-full h-full     px-1 py-2  grid  grid-cols-2">
            <div className="flex relative h-16 flex-col gap-1 px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Endereço de entrega
              </label>
              <input
                type="text"
                {...register("endereco")}
                placeholder="Digite o endereco"
                className="w-full px-4   border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.endereco && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.endereco.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                CEP
              </label>
              <input
                type="text"
                {...register("cep")}
                placeholder="Digite o cep"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.cep && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.cep.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Cidade
              </label>
              <input
                type="text"
                {...register("cidade")}
                placeholder="Digite a cidade"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.cidade && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.cidade.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Estado
              </label>
              <input
                type="text"
                {...register("estado")}
                placeholder="Digite o estado"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.estado && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.estado.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Numero
              </label>
              <input
                type="text"
                {...register("numero")}
                placeholder="Digite o numero do endereco"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.numero && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.numero.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Numero de telefone
              </label>
              <input
                value={formatPhoneText(String(watch("telefone")))}
                type="text"
                {...register("telefone")}
                placeholder="Digite o numero de telefone"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.telefone && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.telefone.message as any}
                </span>
              )}
            </div>
            <div className="flex col-span-full flex-col h-16 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Complemento
              </label>
              <input
                type="text"
                {...register("complemento")}
                placeholder="Complemento ou observação"
                className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
              />
              {errors.complemento && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.complemento.message as any}
                </span>
              )}
            </div>
            <div className="flex col-span-full flex-col  h-24 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Método de entrega
              </label>
              <div
                onChange={(e) => {
                  console.log(e);
                  setValue("metodoEntrega", e.target.name);
                }}
                className="flex w-full  gap-4"
              >
                <div className="w-1/2 flex gap-2">
                  <input
                    // onChange={(e) => {
                    //   if (e.target.checked) {
                    //     setValue("metodoEntrega", "Entrega");
                    //   }
                    // }}
                    checked={watch("metodoEntrega") === "Entrega"}
                    type="radio"
                    className="accent-[--button-color] text-[--button-color]"
                    id="metodo"
                    name="Entrega"
                  />
                  <label className="text-sm text-[--text-color2]">
                    Entrega
                  </label>
                </div>
                <div className="w-full flex gap-2">
                  <input
                    // onChange={(e) => {
                    //   if (e.target.checked) {
                    //     setValue("metodoEntrega", "Retirada");
                    //   }
                    // }}
                    checked={watch("metodoEntrega") === "Retirada"}
                    type="radio"
                    className="accent-[--button-color]"
                    id="metodo"
                    name="Retirada"
                  />
                  <label className="text-sm text-[--text-color2]">
                    Retirada
                  </label>
                </div>
              </div>

              {errors.estado && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                  {errors?.estado.message as any}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="h-full  gap-2 bg-white  border-[1px] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)]  flex flex-col justify-center items-center w-[40%]">
          <div className="w-full justify-center items-center h-24 py-5 gap-5 flex px-4 border-b-[1px] text-center text-lg  font-semibold">
            <div className=" flex justify-center items-center">
              <CreditCard size={35} />
            </div>
            <h1 className="text-xl">Pagamento</h1>
          </div>
          <div className="w-full h-full px-1 py-1  grid  grid-cols-2">
            <div className="flex col-span-full flex-col  h-14 gap-1 relative px-2  justify-center items-center ">
              <label className="w-full font-semibold text-sm text-[--text-color] ">
                Método de Pagamento
              </label>
              <div className="flex w-full  gap-4">
                <div className="w-1/2 flex gap-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValue("metodoPagamento", "Cartão");
                      }
                    }}
                    defaultChecked
                    type="radio"
                    className="accent-[--button-color] text-[--button-color]"
                    id="pagamento"
                    name="pagamento"
                  />
                  <label className="text-sm text-[--text-color2]">Cartão</label>
                </div>
                <div className="w-full flex gap-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValue("metodoPagamento", "Boleto");
                      }
                    }}
                    type="radio"
                    className="accent-[--button-color]"
                    id="pagamento"
                    name="pagamento"
                  />
                  <label className="text-sm text-[--text-color2]">Boleto</label>
                </div>
              </div>

              {errors.estado && (
                <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal"></span>
              )}
            </div>
            {metodoPagamento === "Cartão" ? (
              <>
                {" "}
                <div className="flex col-span-full relative h-16 flex-col gap-1 px-2  justify-center items-center ">
                  <label className="w-full font-semibold text-sm text-[--text-color] ">
                    Nome do Titular
                  </label>
                  <input
                    type="text"
                    {...register("nomeTitular")}
                    placeholder="Fulana de tal"
                    className="w-full px-4  border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
                  />
                  {errors?.nomeTitular && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                      {errors?.nomeTitular.message as any}
                    </span>
                  )}
                </div>
                <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
                  <label className="w-full font-semibold text-sm text-[--text-color] ">
                    CVV
                  </label>
                  <input
                    type="text"
                    {...register("cvv")}
                    placeholder="Digite o cvv"
                    className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
                  />
                  {errors?.cvv && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                      {errors?.cvv.message as any}
                    </span>
                  )}
                </div>
                <div className="flex flex-col h-16 gap-1 relative px-2  justify-center items-center ">
                  <label className="w-full font-semibold text-sm text-[--text-color] ">
                    CPF
                  </label>
                  <input
                    type="text"
                    {...register("cpf")}
                    onChange={(e) => {
                      setValue("cpf", formatCpfText(e.target.value));
                    }}
                    placeholder="xxx.xxx.xxx-xx"
                    className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
                  />
                  {errors?.cpf && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                      {errors.cpf.message as any}
                    </span>
                  )}
                </div>
                <div className="flex col-span-full flex-col h-16 gap-1 relative px-2  justify-center items-center ">
                  <label className="w-full font-semibold text-sm text-[--text-color] ">
                    Numero do cartão
                  </label>
                  <input
                    type="text"
                    {...register("numeroCartao")}
                    onChange={(e) => {
                      setValue(
                        "numeroCartao",
                        formatarNumeroCartaoCredito(e.target.value)
                      );
                    }}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    className="w-full px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
                  />
                  {errors?.numeroCartao && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                      {errors.numeroCartao.message as string}
                    </span>
                  )}
                </div>
                <div className="flex flex-col col-span-full w-1/2 h-16 gap-1 relative px-2  justify-center items-center ">
                  <label className="w-full font-semibold text-sm text-[--text-color] ">
                    Validade
                  </label>
                  <input
                    type="date"
                    {...register("validade")}
                    placeholder="Digite a data de validade"
                    className="w-full  px-4 border-[1px] border-[--inputs-border] focus:outline-none rounded h-10"
                  />
                  {errors?.validade && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-22px] text-sm font-normal">
                      {errors?.validade.message as any}
                    </span>
                  )}
                </div>{" "}
                <div className="flex  col-span-full gap-4 h-16  relative px-2  justify-center items-center ">
                  <img
                    onClick={() => {
                      setValue("bandeira", "Visa");
                    }}
                    className={`w-14 ${
                      watch("bandeira") == "Visa"
                        ? "scale-125 shadow-[1px_15px_20px_-5px_rgba(0,0,0,0.30)] translate-y-[-5px]"
                        : " hover:scale-125 hover:translate-y-[-5px] hover:shadow-[1px_15px_20px_-10px_rgba(0,0,0,0.30)]"
                    }   cursor-pointer 
              transition-all duration-300 rounded h-9 `}
                    src="https://www.amigao.com/media/wysiwyg/visa2.png"
                    alt=""
                  />

                  <input
                    {...register("bandeira")}
                    type="text"
                    className="absolute z-[-10] opacity-0 "
                  />
                  <img
                    onClick={() => {
                      setValue("bandeira", "Mastercard");
                    }}
                    className={`w-14 ${
                      watch("bandeira") == "Mastercard"
                        ? "scale-125 shadow-[1px_15px_20px_-5px_rgba(0,0,0,0.30)] translate-y-[-5px]"
                        : " hover:scale-125 hover:translate-y-[-5px] hover:shadow-[1px_15px_20px_-10px_rgba(0,0,0,0.30)]"
                    }   cursor-pointer 
              transition-all duration-300 rounded h-9 `}
                    src="https://www.amigao.com/media/wysiwyg/master2.png"
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setValue("bandeira", "Amex");
                    }}
                    className={`w-14 ${
                      watch("bandeira") == "Amex"
                        ? "scale-125 shadow-[1px_15px_20px_-5px_rgba(0,0,0,0.30)] translate-y-[-5px]"
                        : " hover:scale-125 hover:translate-y-[-5px] hover:shadow-[1px_15px_20px_-10px_rgba(0,0,0,0.30)]"
                    }   cursor-pointer 
              transition-all duration-300 rounded h-9 `}
                    src="https://www.amigao.com/media/wysiwyg/amex_1.png"
                    alt=""
                  />
                  <img
                    onClick={() => {
                      setValue("bandeira", "Diners");
                    }}
                    className={`w-14 ${
                      watch("bandeira") == "Diners"
                        ? "scale-125 shadow-[1px_15px_20px_-5px_rgba(0,0,0,0.30)] translate-y-[-5px]"
                        : " hover:scale-125 hover:translate-y-[-5px] hover:shadow-[1px_15px_20px_-10px_rgba(0,0,0,0.30)]"
                    }   cursor-pointer 
              transition-all duration-300 rounded h-9 `}
                    src="https://www.amigao.com/media/wysiwyg/diners_1.png"
                    alt=""
                  />
                  {errors?.bandeira && (
                    <span className="text-red-500 absolute w-full px-2 bottom-[-20px] text-sm font-normal">
                      {errors?.bandeira.message as any}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        </div>
      </form>
    );
  };

  const bandeiras: any = {
    Visa: "https://www.amigao.com/media/wysiwyg/visa2.png",
    Mastercard: "https://www.amigao.com/media/wysiwyg/master2.png",
    Amex: "https://www.amigao.com/media/wysiwyg/amex_1.png",
    Diners: "https://www.amigao.com/media/wysiwyg/diners_1.png",
  };

  const stage3 = () => {
    return (
      <div className="w-full pt-20 h-full flex flex-col justify-center items-center">
        <div className="w-full  h-[60vh] flex flex-col bg-white border-[1px] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] ">
          <div className="w-full px-2 py-4 text-center text-xl font-semibold text-[--text-color] border-b-[1px] ">
            Resumo Do pedido
          </div>
          <div className="w-full h-full overflow-hidden flex ">
            <div className="w-full h-auto min-h-full overflow-y-auto ">
              <div className="w-full h-20 mb-10 items-center justify-between pl-20 pr-14 flex bg-[--border-light]  border-[--text-color]">
                <span className="text-xl w-full font-semibold">
                  Item e Preço
                </span>
                <span className="text-xl mx-20 text-center w-1/5  font-semibold">
                  Qtd
                </span>
                <span className="text-xl  w-1/5 font-semibold">Subtotal</span>
              </div>
              {cartItems?.map((elem: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index == cartItems?.length - 1
                        ? "border-b-[1px]"
                        : "border-b-0 "
                    }  flex border-[1px] relative bg-white  h-28  border-[--inputs-border]  justify-center items-center`}
                  >
                    <img className="w-14 h-14 mr-2" src={elem.img} alt="" />
                    <div className="flex flex-col h-16 gap-2 w-[55%]">
                      <span className=" text-sm font-semibold pr-2 text-[--text-dark]">
                        {elem.nome}
                      </span>
                      <span className=" text-sm font-medium">{elem.preco}</span>
                    </div>
                    <div className=" z-0 w-12 mx-10 p-0.5 h- 8 rounded border-[1px] border-[--inputs-border] flex justify-center items-center">
                      <span>{elem.quantity}</span>
                    </div>

                    <span className="w-1/5 text-sm text-center ">
                      {totalValue(elem.preco, elem.quantity)}
                    </span>
                  </div>
                );
              })}
              <div className="w-full  h-24 mt-10 flex justify-between items-center px-4 pt-4 bg-[--border-light]">
                <div className="flex flex-col gap-2 justify-start m-auto items-center h-20">
                  <p className="h-1/4 font-semibold text-[--text-color2] text-xl">
                    Método de Entrega
                  </p>
                  <p>{watch("metodoEntrega")}</p>
                </div>
                <div className="flex flex-col gap-2 justify-start m-auto items-center h-20">
                  <p className="h-1/4 font-semibold text-[--text-color2] text-xl">
                    Metodo de Pagamento
                  </p>
                  <p> {metodoPagamento}</p>
                </div>

                {metodoPagamento === "Cartão" && (
                  <div className="flex flex-col gap-2 justify-start m-auto items-center h-20 ">
                    <p className="h-1/4 font-semibold text-[--text-color2] text-xl">
                      Bandeira
                    </p>
                    <img
                      className="h-10 w-14"
                      src={bandeiras[watch("bandeira")]}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 justify-start m-auto items-center h-20  ">
                  <p className="font-semibold text-[--text-color2] text-xl">
                    Valor Total
                  </p>
                  <p className=" text-red-500"> {totalAllValue()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const animationContainer = useRef<any>(null);
  const [orderId, setOrderId] = useState<any>();

  useEffect(() => {
    if (actualStage === 3) {
      Lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/ShippingAnimation.json",
      });
      const numb = Math.floor(Math.random() * 1000000);
      setOrderId(numb);
      const order: any = {
        email: storageData?.email,
        orderId: numb,
        endereco: {
          logradouro: watch("endereco"),
          numero: watch("numero"),
          cidade: watch("cidade"),
          estado: watch("estado"),
          cep: watch("cep"),
          telefone: watch("telefone"),
        },
        metodoEntrega: watch("metodoEntrega"),
        metodoPagamento: watch("metodoPagamento"),
      };

      if (watch("metodoPagamento") === "Cartão") {
        order["pagamento"] = {
          nomeTitular: watch("nomeTitular"),
          cvv: watch("cvv"),
          cpf: watch("cpf"),
          numeroCartao: watch("numeroCartao"),
          validade: watch("validade"),
          bandeira: watch("bandeira"),
        };
      }

      if (order) {
        addOrder(order);
      }
    }
  }, [actualStage]);

  const stage4 = () => {
    return (
      <div className="w-full h-full flex flex-col  mt-20">
        <div className="w-full justify-center flex-col items-center text-xl font-semibold flex ">
          <p> Pedido realizado!</p>
          <p> #{orderId}</p>
        </div>

        <div className="w-full h-3/4" ref={animationContainer}></div>
      </div>
    );
  };

  const stagesContent = [stage1(), stage2(), stage3(), stage4()];

  return (
    <div
      className={`${
        isFinalizationOpen ? "" : "hidden"
      } w-screen  h-screen left-0 z-50 overflow-hidden fixed flex justify-center items-center bg-black/50`}
    >
      <div className="h-[85%]  w-[60%] border-4 border-[#203669] flex items-center justify-start pt-28 flex-col bg-[--background] rounded-[25px] relative">
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
            <div
              className={`w-[70%] flex absolute bottom-8 ${
                actualStage !== 3 ? "justify-between" : "justify-end"
              }   `}
            >
              {actualStage !== 3 && (
                <button
                  onClick={previousStage}
                  className={`w-60 h-12 rounded-lg ${
                    stages[actualStage - 1]
                      ? ""
                      : "opacity-65 cursor-not-allowed"
                  } text-[#203669]  font-bold border-4 border-[#203669]`}
                >
                  Voltar
                </button>
              )}
              <button
                onClick={nextStage}
                className={`h-12 w-60  rounded-lg  hover:bg-white transition-all duration-300 hover:text-[#203669] hover:border-[#203669] border-4 border-transparent text-white text-base  font-bold  bg-[#203669]`}
              >
                {actualStage == 2 ? "Concluir Pedido" : " Avançar"}
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
          <div className="h-40 w-40 bg-transparent absolute top-[30vh] animate-[spin_1s_ease_infinite] border-8 rounded-full  border-[--inputs-border] border-b-[--button-color]"></div>
        )}
      </div>
    </div>
  );
};
