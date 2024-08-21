import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
const Task = () => {
    const [task, setTask] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
const axiosSecure=useAxiosSecure();
    const handleTaskSubmit = async (event) => {
        event.preventDefault();

        const taskData = {
            task,
            hoursWorked,
            date,
        };

        try {
            const res = await axiosSecure.post('/tasks', taskData);
            if (res.data.insertedId) {
                console.log('Task added');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task submitted successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to submit the task.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="flex flex-col font-sedan justify-center my-36" id='task'>
            <h2 className='text-xl text-center'>Submit your task</h2>
            <div className="font-sedan mx-auto w-full">
                <div className="w-full">
                    <form onSubmit={handleTaskSubmit} className="flex items-center space-x-4 p-4">
                        <div className="flex-1">
                            <label htmlFor="task" className="block text-lg font-medium text-gray-900">
                                Task
                            </label>
                            <input
                                id="task"
                                name="task"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="hoursWorked" className="block text-lg font-medium text-gray-900">
                                Hours Worked
                            </label>
                            <input
                                type="number"
                                id="hoursWorked"
                                name="hoursWorked"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                                value={hoursWorked}
                                onChange={(e) => setHoursWorked(e.target.value)}
                            />
                        </div>
                        
                       
                        <div className="flex-1">
                            <label htmlFor="date" className="block text-lg font-medium text-gray-900">
                                Date
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="date"
                                    value={date}
                                    onChange={(newDate) => setDate(newDate)}
                                    renderInput={(params) => (
                                        <input
                                            {...params}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="flex-shrink-0 pt-6">
                            <button
                                type="submit"
                                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-[#6247AA] focus:ring-4 focus:outline-none "
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Task;
