import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';

const PieChartEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ['employee-designation'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employee-designation');
      return res.data;
    }
  });

  const COLORS = ['#4A90E2', '#7B61FF', '#B15EAB', '#50E3C2', '#A5D8FF', '#C7CEEA', '#9B9B9B'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Increase the radius for label positioning
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={stats}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={0} // Increase inner radius for a bigger pie
          outerRadius={130} // Increase outer radius for a bigger pie
          fill="#8884d8"
          dataKey="designationCount"
        >
          {stats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
          layout="vertical" 
          align="right" 
          verticalAlign="middle" 
          formatter={(value, entry, index) => `${stats[index]._id}`} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartEmployee;
