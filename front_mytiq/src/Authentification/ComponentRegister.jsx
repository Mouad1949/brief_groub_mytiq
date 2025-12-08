import axios from 'axios';
import React, { useState } from 'react'

function ComponentRegister() {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/users/register', {
        nom, prenom, email, password
      });
      setMessage('Account created successfully!',res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
  <div className="p-20 flex justify-center">
  <form className="border-2 border-gray-600 shadow-lg rounded-3xl w-[450px] p-6" onSubmit={handleRegister}>
    
    <h4 className="text-2xl font-bold mb-1">Register</h4>
    <p className="mb-4 text-gray-600">Create a new account</p>
     {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    <label className="block text-gray-700 mb-1">Nom</label>
    <input type="text" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4" value={nom} onChange={(e)=> setNom(e.target.value)} />
    <label className="block text-gray-700 mb-1">Prenom</label>
    <input type="text" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4"value={prenom} onChange={(e)=> setPrenom(e.target.value)}/>
    <label className="block text-gray-700 mb-1">Email</label>
    <input type="email" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4" value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <label className="block text-gray-700 mb-1">Passwod</label>
    <input type="password" className="border-2 border-gray-500 p-2 rounded-lg w-full mb-4" value={password} onChange={(e)=> setPassword(e.target.value)}/>
    <input type="submit" className="bg-blue-600 p-2 rounded-lg w-full mb-4 cursor-pointer" value='Rgister'/>
    <p className="mx-auto text-gray-600">Already have an account? <a className='text-blue-500' href='/login'>login Here</a></p>
  </form>
</div>

  )
}

export default ComponentRegister