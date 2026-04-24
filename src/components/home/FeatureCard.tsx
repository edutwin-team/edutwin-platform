import type { ReactElement } from "react";

type FeatureCardProps={
    title:string;
    description:string;
    icon:ReactElement;
    optionLabel?: string;

}
export const FeatureCard:React.FC<FeatureCardProps>=({title,description,icon,optionLabel})=>{
  return (
    <article className="home-feature-card rounded-2xl border border-white/10 p-5 text-left shadow-lg transition hover:border-indigo-400/50">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
          {icon}
        </div>
        {optionLabel && (
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-200">
            {optionLabel}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </article>
  );
}