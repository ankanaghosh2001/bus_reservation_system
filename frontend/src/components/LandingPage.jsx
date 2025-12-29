import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import bus from '../assets/bus.png';
import { Eye, EyeOff } from 'lucide-react';

const LandingPage = () => {

  const backendApi = import.meta.env.VITE_BACKEND_API || "http://localhost:5000";

  const { register, handleSubmit, setError, reset, watch, formState: { errors, isSubmitting } } = useForm();

  const [isLogin, setIsLogin] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  

  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${backendApi}/login`, {
        username: data.username,
        phone: data.phone,
        password: data.password
      });

      if (response.status === 200) {
        alert("Login Successful! Redirecting to seat booking...");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userID", data.phone);
        navigate("/seat-booking");
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data || error.message));
    }
    reset();
  };

  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${backendApi}/register`, {
        username: data.username,
        phone: data.phone,
        password: data.password
      });

      if (response.status === 200) {
        alert("Registration Successful! Redirecting to login...");
        setIsLogin(true);
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("Registration failed: " + (error.response?.data || error.message));
    }
    reset();
  };

  const resetPassword = async(data) => {
    try{
      const response = await axios.post(`${backendApi}/reset_password`, {
        username: data.username,
        phone: data.phone,
        password: data.password
      });

      if(response.status === 200){
        alert("Password Reset Successful! Redirecting to login...");
        setIsLogin(true);
        setForgetPass(false);
      } else{
        alert("Password Updation Failed. Invalid username or phone number!");
      }
    } catch(error){
      alert("Password Reset Failed. Invalid credentials ");
    }
    reset();
  }

  return (
    <main>
      <div className="landing-container">
        <div className="landingImage">
            <img src={bus} alt="Bus Image" />
        </div>
        {!forgetPass && 
        <div className="landingForm" align="center">
            <div className="heading">{isLogin && !forgetPass ? "Log-In" : "Register"}</div><br />
            <form onSubmit={isLogin ? handleSubmit(loginUser) : handleSubmit(registerUser)}>
              <input type="text" placeholder="Enter Your Name" {...register("username", {required : {value: true, message: "Username is required"}, maxLength: {value: 25, message: "Maximum length cannot exceed 25"}})}/>
              {errors.username && <div className='red'>{errors.username.message}</div>}
              <br />
              <input placeholder="Enter Your Contact No." type="tel" {...register("phone", {required: {value: true, message: "Phone Number is required"}, maxLength:{value: 10, message: "Phone Number must contain 10 digits"}, minLength:{value: 10, message: "Phone Number must contain 10 digits"}})} />
              {errors.phone && <div className='red'>{errors.phone.message}</div>}
              <br />
              <div className="passwordGrp">
                <div className="inputGrp">
                  <input placeholder="Enter Your Password" type={showPassword ? "text" : "password"}  {...register("password", {required: {value: true, message: "Password is required"}, maxLength:{value: 15, message: "Passwords cannot exceed 15 characters"}, minLength:{value: 8, message: "Password must contain at least 8 characters"}})} />
                  {showPassword ? <Eye className="eyeIcon" onClick={() => setShowPassword(!showPassword)}/> : <EyeOff className="eyeIcon" onClick={() => setShowPassword(!showPassword)}/>}
                </div>
                {errors.password && <div className='red'>{errors.password.message}</div>}
                
              </div>
              <br />
              {isLogin ? <p id='forgetPass' onClick={() => setForgetPass(true)}>Forgot Your Password?</p> : ""}
              <input type="submit" value="Submit" disabled={isSubmitting}/>
              {errors.thisform && <div className='red'>{errors.thisform.message}</div>}
            </form>
            <br />
            { isLogin ? (
              <h3>New User? <span onClick={() => setIsLogin(false)}>Register Here</span></h3>) : (
              <h3>Already Have an Account? <span onClick={() => setIsLogin(true)}>Login Here</span></h3>)
            }
        </div>
        }
        {forgetPass && 
        <div className="landingForm" align="center">
            <div className="heading">Reset Password</div><br />
            <form onSubmit={handleSubmit(resetPassword)}>
              <input type="text" placeholder="Enter Your Name" {...register("username", {required : {value: true, message: "Username is required"}, maxLength: {value: 25, message: "Maximum length cannot exceed 25"}})}/>
              {errors.username && <div className='red'>{errors.username.message}</div>}
              <br />
              <input placeholder="Enter Your Contact No." type="tel" {...register("phone", {required: {value: true, message: "Phone Number is required"}, maxLength:{value: 10, message: "Phone Number must contain 10 digits"}, minLength:{value: 10, message: "Phone Number must contain 10 digits"}})} />
              {errors.phone && <div className='red'>{errors.phone.message}</div>}
              <br />
              <div className="passwordGrp">
                <div className="inputGrp">
                  <input placeholder="Enter Your New Password" type={showPassword ? "text" : "password"}  {...register("password", {required: {value: true, message: "Password is required"}, maxLength:{value: 15, message: "Passwords cannot exceed 15 characters"}, minLength:{value: 8, message: "Password must contain at least 8 characters"}})} />
                  {showPassword ? <Eye className="eyeIcon" onClick={() => setShowPassword(!showPassword)}/> : <EyeOff className="eyeIcon" onClick={() => setShowPassword(!showPassword)}/>}
                </div>
                {errors.password && <div className='red'>{errors.password.message}</div>}
              </div>
              <br />
              {}
              <input type="submit" value="Submit" disabled={isSubmitting}/>
              {errors.thisform && <div className='red'>{errors.thisform.message}</div>}
            </form>
            <br />
            <h3>Go back to <span onClick={() => {
              setIsLogin(true)
              setForgetPass(false);
            }}>Login</span></h3>
        </div>
        }
      </div>
    </main>
  )
}

export default LandingPage
