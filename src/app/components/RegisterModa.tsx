import { Button } from "./forms/Button";
import { Input } from "./forms/input";

export const RegisterModal = ({
  inputsSchema,
  onChangeInputs,
  inputsData,
  onSubmit,
  isOpen,
  setIsOpenModal,
}: any) => {
  return (
    <div
      className={`w-screen fixed ${
        isOpen ? "" : "hidden"
      } h-screen backdrop-brightness-0 flex justify-center items-center `}
    >
      <div className="w-1/2 relative h-1/2 border-2 gap-5 border-white flex flex-col justify-center items-center">
        <h1>CADASTRO</h1>
        <div
          onClick={() => setIsOpenModal(false)}
          className="absolute top-2 right-4 cursor-pointer transition-all hover:text-red-500"
        >
          x
        </div>
        <div className={`flex flex-col w-2/3 justify-center items-center`}>
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
        <Button label="Entrar" onClick={onSubmit} />
      </div>
    </div>
  );
};
