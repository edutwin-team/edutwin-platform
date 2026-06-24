import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { useMemo, useState } from 'react';
import { dayToFrench, orderedDays } from '../../utils/dashboard/mapDays';

type WeeklySimulation = {
  day: string;
  count: number;
};

type Props = {
  data: WeeklySimulation[];
};

const SimulationsChart = ({ data }: Props) => {
  const [selectedDay, setSelectedDay] = useState<string>('ALL');

  // normalisation
  const normalizedData = useMemo(() => {
    return orderedDays.map((day) => {
      const found = data.find((d) => d.day === day);
      return {
        day,
        label: dayToFrench[day],
        count: found ? found.count : 0,
      };
    });
  }, [data]);

  const filteredData =
    selectedDay === 'ALL' ? normalizedData : normalizedData.filter((d) => d.day === selectedDay);

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
          <h3 className="text-lg font-bold dark:text-white">Simulations des 7 derniers jours</h3>
          <p className="text-gray-500 dark:text-gray-400">Activité des simulations</p>
        </div>

        {/* select day of week */}
        <select
          className="select select-md dark:text-white"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="ALL">Tous les jours</option>
          {orderedDays.map((day) => (
            <option key={day} value={day}>
              {dayToFrench[day]}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <XAxis dataKey={selectedDay === 'ALL' ? 'label' : 'label'} />
            <YAxis allowDecimals={false} />

            {/* TOOLTIP in fr */}
            <Tooltip
              formatter={(value) => [`${value} simulations`, 'Nombre']}
              labelFormatter={(label) => `Jour : ${label}`}
            />

            <Line type="monotone" dataKey="count" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimulationsChart;
