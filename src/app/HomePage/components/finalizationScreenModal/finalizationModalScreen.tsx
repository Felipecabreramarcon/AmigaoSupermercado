import { CircleX } from "lucide-react";
import { useState } from "react";

export const FinalizationModal = ({
  data,
  itemQuant,
  totalValue,
  setIsFinalizationOpen,
  isFinalizationOpen,
  close,
}: any) => {
  const [actualStage, setActualStage] = useState<number>(0);

  const stages = [
    "Validação dos dados",
    "Endereço de Entrega",
    "Pagamento",
    "Finalização",
  ];
  const nextStage = () => {
    if (actualStage < stages.length - 1) {
      setActualStage(actualStage + 1);
    }
  };

  const previousStage = () => {
    if (actualStage > 0) {
      setActualStage(actualStage - 1);
    }
  };

  return (
    <div
      className={`${
        isFinalizationOpen ? "" : "hidden"
      } w-screen  h-screen left-0 z-50 overflow-hidden fixed flex justify-center items-center bg-black/50`}
    >
      <div className="h-[75%]  w-[60%] border-4 border-[#203669] flex items-center justify-center flex-col bg-slate-100 rounded-[25px] relative">
        <div className="absolute z-40 hover:text-red-500 transition-all  top-5 right-5">
          <CircleX
            onClick={() => {
              setIsFinalizationOpen(false);
              document.body.style.overflowY = "unset";
              close(false);
            }}
            size={30}
            className="cursor-pointer"
          />
        </div>
        <div className="w-[50%] flex absolute bottom-8 justify-between  ">
          <button
            onClick={previousStage}
            className={`w-40 h-12 rounded-[15px] ${
              stages[actualStage - 1] ? "" : "opacity-65 cursor-not-allowed"
            } text-[#203669]  font-bold border-4 border-[#203669]`}
          >
            Voltar
          </button>
          <button
            onClick={nextStage}
            className={`h-12 w-40  hover:bg-white transition-all duration-300 hover:text-[#203669] hover:border-[#203669] border-4 border-transparent text-white text-base rounded-[15px] font-bold  bg-[#203669]`}
          >
            Avançar
          </button>
        </div>

        <div className="flex gap-6 justify-center items-center absolute  top-5 w-full">
          {stages.map((stage: string, index: number) => {
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
      </div>
    </div>
  );
};
