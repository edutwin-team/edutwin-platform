import type { ReactElement } from "react";

type FeatureCardProps={
    title:string;
    description:string;
    icon:ReactElement

}
export const FeatureCard:React.FC<FeatureCardProps>=({title,description,icon})=>{
  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 p-6 shadow-lg hover:border-indigo-500/40 transition">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}