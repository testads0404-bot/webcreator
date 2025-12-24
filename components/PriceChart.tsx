import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface PriceChartProps {
  data: DataPoint[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#f59e0b'];

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  if (data.reduce((a, b) => a + b.value, 0) === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        هنوز گزینه‌ای انتخاب نشده است
      </div>
    );
  }

  return (
    <div className="h-64 w-full" dir="ltr"> 
      {/* dir=ltr is important for recharts to render correctly even in RTL layouts usually, 
          but labels need handling. Tailwind keeps container correct. */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value} م.ت`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
