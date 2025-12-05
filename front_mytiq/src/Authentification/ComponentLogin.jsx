import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../context/RoleContext';


function ComponentLogin() {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
  const navigate = useNavigate();
  const {setRole} = useContext(RoleContext);
      const hendleLogin = async (e) =>
    {
      e.preventDefault();

      try{
        if (!email || !password) {
            alert('Please enter email and password');
            return;
          }
        const res = await axios.post('http://127.0.0.1:8000/api/users/login' ,{email,password})

        const token = res.data.token;
        const role = res.data.user;
        localStorage.setItem('auth_token' ,token);
        localStorage.setItem('role' ,role);
        // const userRole = res.data.user.role;
        setRole(role);
        if(role === 'admin'){
            navigate('/tickets')
        }else{
          navigate('/')
        }
        
      }catch(err){
        setError(err.response.data.message || 'Login failed')
      }
    }
  return (
    
      <div className="p-20 flex justify-center">
        
        <form className="bg-gradient-to-r from-[#d8dadf] via-[#d7d9e0] to-[#f0f2fa] shadow-lg rounded-3xl w-[450px] p-6" onSubmit={hendleLogin}>
          
          <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 bg-clip-text text-transparent mb-1">Welcome Back</h4>
          <p className="mb-4 text-gray-600">Sign in to your MyTiq account </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <label className="block text-gray-700 mb-1">Passwod</label>
          <input type="password" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <input type="submit" className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 p-2 rounded-lg w-full mb-4 cursor-pointer" value='Login'/>
          <p className="mx-auto text-gray-600">Don’t have an account? <a className='text-blue-500' href='/register'>Register Here</a></p>
        </form>
      </div>
    
  )
}

export default ComponentLogin