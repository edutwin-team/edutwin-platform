import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 85 },
  { name: 'Feb', value: 70 },
  { name: 'Mar', value: 65 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 50 },
  { name: 'Jul', value: 90 },
];

const SuccessRatesCard = () => {
  return (
    <div
      className="
      p-6 rounded-3xl border
      bg-white border-gray-200 shadow-sm
      dark:bg-base-200 dark:border-base-300
    "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold dark:text-white">Predicted Success Rates</h3>
          <p className=" text-gray-500 dark:text-gray-400">Based on active digital twin profiles</p>
        </div>

        <select
          defaultValue="This Semester"
          className="
         select  select-md  dark:text-white
        "
        >
          <option>This Semester</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SuccessRatesCard;
