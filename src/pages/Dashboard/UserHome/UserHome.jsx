import React from 'react';
import useAuth from '../../Components/hooks/useAuth';
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';

const UserHome = () => {
    const { user } = useAuth();
    const{users}=useAxiosPublic();
    return (
        <div className='my-10 text-center font-sedan text-2xl'>
            <p>Welcome</p>
            {user?.displayName ? user.displayName : "Hello Back"}
          {users}
        </div>
    );
};

export default UserHome;
