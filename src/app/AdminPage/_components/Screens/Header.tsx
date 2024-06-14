import { Button } from "@/app/components/forms/Button";

export const Header = () => {
  return (
    <div className="h-32 shadow-md z-10 bg-[#183149] w-full flex pr-16 justify-between items-center">
      <div className="h-full relative  pl-10 flex justify-center items-center">
        <img
          className="w-20 h-18 bg-white pb-2 px-2"
          src="https://www.amigao.com/media/logo/stores/1/logo-amigao.png"
          alt=""
        />
      </div>

      <div className="w-44 flex justify-center items-center">
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          label={"sair"}
        />{" "}
      </div>
    </div>
  );
};
