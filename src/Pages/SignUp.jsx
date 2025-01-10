import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Logo2 from "../images/TAGGLE LOGO2.png"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      if (response.data.message === "Registration Successful") {
        toast.success("Registration Successful");
        navigate('/feed');
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center openSans">
      <div className="bg-white shadow-lg rounded-lg mx-4 p-6 w-full max-w-lg">
        <h1 className="text-5xl montserrat font-bold text-center text-red-600 flex items-center justify-center">
          Join <img src={Logo2} alt="" className="w-[8rem] h-auto" />
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 openSans">
          <div className="w-full flex flex-col mobile:text-sm">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-600 focus:border-red-600"
            />
          </div>
          <div className="w-full flex flex-col mobile:text-sm">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-600 focus:border-red-600"
            />
          </div>

          <div className="flex flex-col w-full mobile:text-sm">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-600 focus:border-red-600"
            />
          </div>

          <p className="text-xs text-center mt-4 poppins w-[90%] mx-auto text-gray-400">By clicking SignUp or Continue, you 
          agree to the Taggle <span className="text-red-600 cursor-pointer font-medium hover:border-b-red-600 
          hover:border-b" onClick={() => navigate('/user-agreement')}>User Agreement</span>, <span className="text-red-600 cursor-pointer font-medium hover:border-b-red-600 hover:border-b" onClick={() => navigate('/privacy-policy')}>Privacy Policy</span> and <span className="text-red-600 cursor-pointer font-medium hover:border-b-red-600 hover:border-b" onClick={() => navigate("/cookies-policy")}>Cookies`` Policy</span></p>

          <button
            type="submit"
            className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-600 montserrat font-medium"
          >
            Sign Up
          </button>

          <p className="text-xs text-center poppins w-full mx-auto text-gray-400">Already on Taggle? <span className="text-red-600 cursor-pointer font-medium hover:border-b-red-600 hover:border-b" onClick={() => navigate('/signin')}>Sign in</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;