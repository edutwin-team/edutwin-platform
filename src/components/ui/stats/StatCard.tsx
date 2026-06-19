type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
};

const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => {
  return (
    <div
      className="
      rounded-3xl p-7 min-h-[140px]
      border transition-all duration-200
      bg-white border-gray-200 shadow-sm hover:shadow-md
      dark:bg-base-200 dark:border-base-300 dark:shadow-none dark:hover:shadow-lg
    "
    >
      <div className="flex flex-col gap-4">
        {/* Icon */}
        <div
          className={`
          w-12 h-12 flex items-center justify-center rounded-2xl
          ${bgColor}
          text-white
          shadow-sm
          dark:shadow-none
        `}
        >
          {icon}
        </div>

        {/* Content */}
        <div>
          <p
            className="
            text-sm
            text-gray-500
            dark:text-white
          "
          >
            {title}
          </p>

          <h2
            className="
            text-3xl font-semibold mt-1
            text-gray-900
            dark:text-white
          "
          >
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
