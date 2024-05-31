export const buttonStyles = (style: string) => {
  if (style == "default")
    return "w-1/3 h-10 rounded-lg hover:bg-white/75 hover:text-black transition-all bg-white/50 mt-6";
  if (style == "outlined") {
    return "w-1/3 h-auto text-sm hover:border-white hover:text-blue-500 transition-all border-b-[1px] border-blue-500 ";
  }
  if (style == "texted")
    return "w-auto h-5 text-sm border-b-[1px] border-red-500";
};
