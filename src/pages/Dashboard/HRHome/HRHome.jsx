import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { FaUser, FaUsers } from 'react-icons/fa';
import Employees from '../Employees/Employees';
import PieChart_employee from './PieChart_employee';

const HRHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ['salary-distribution'],
    queryFn: async () => {
      const res = await axiosSecure.get('/salary-distribution');
      return res.data;
      
    }
  });
  const { data: users = [] } = useQuery({
    queryKey: ['total-employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/total-employees');
      return res.data;
      
    }
  });





  const colors = ['#6247AA', '#E2CFEA', '#A06CD5'];

  const formatLabel = (value) => {
    // Split the label into multiple lines if it's too long
    if (value && value.length > 8) {
      const mid = Math.floor(value.length / 2);
      const spaceIndex = value.lastIndexOf(' ', mid);
      const indexToSplit = spaceIndex > 0 ? spaceIndex : mid;
      return `${value.substring(0, indexToSplit)}\n${value.substring(indexToSplit)}`;
    }
    return value;
  };

  return (
    <div className='font-sedan items-center ml-60'>
      
    <div className="chart-container mt-36 px-1 mx-auto"id='averageSalaryChart'>
      <BarChart
        width={780} // Reduced width for the chart
        height={300}
        data={stats}
        margin={{ top: 2, right: 20, left: 70, bottom: 5 }}
        barGap={0}// Remove spacing between bars
      >
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis
          dataKey="_id"
          label={{ value: "Designation", position: "insideBottomRight", offset: -5 }}
          tickFormatter={(value) => (value && value.length > 10) ? `${value.substring(0, 10)}...` : value}
          tick={{ textAnchor: 'middle', fontSize: 12}} // Center the labels and adjust font size
        />
        <YAxis label={{ value: "Average Salary", angle: -90, position: "insideLeft" ,offset:'-10'}}
         tick={{ fontSize: 12}} />
        <Tooltip />
        <Legend />
        <Bar dataKey="averageSalary" fill="#8884d8" barSize={50}>
          {stats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>

      <div className="flex space-x-4 mx-20 mt-10 " id='totalEmployees'>
  <div className="stats shadow h-48">
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaUsers className="text-[#6247AA] w-16 h-16" />
      </div>
      <div className="stat-title font-bold ">Employees</div>
      <div className="stat-value">{users.users}</div>
    </div>
  </div>
  <div className="flex-grow">
    <PieChart_employee />
  </div>
</div>

    </div>

   
    <div className='mt-30'>
    <Employees></Employees>
    </div>
    
    
    </div>

  );
};

export default HRHome;
