// import electronLogo from './assets/electron.svg'

import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./components";
import axios from "axios";
import TextInputWithLabel from "./components/TextInputWithLabel";
import { BiLock, BiUser } from "react-icons/bi";
import { useAuthStore } from "./stores/authStore";
import { useGeneralStore } from "./stores/general";
import toast from "react-hot-toast";
import { axiosInstance } from "./libs";

function LoginPage(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/dashboard"} replace />;
  } else {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const setUser = useAuthStore((state) => state.setUser);

    const handleLogin = async (e: FormEvent) => {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          {
            email: username,
            password,
          }
        );

        // console.log(response.data)
        const { token, user } = response?.data;
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("success");
        setAuth(true);
        navigate("/");
      } catch (error: any) {
        console.log("Error Logging in ==>>", error);
        if (error.status == 400) {
          setError("Invalid Credentials");
        } else {
          setError("Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axiosInstance.get("/ping");
          if (response.status == 200) {
            const count = response.data.count;
            if (count === 0) {
              navigate("/register-first-user");
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }, []);

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-20 p-10 ">
        <div className="my-auto space-y-10 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src="/vite.svg"
              alt="AKYERITE SOLUTIONS COMPANY LOGO"
              className="w-24 h-auto object-contain"
            />
            <h1 className="font-bold text-3xl">AKYERITE PAYROLL SOLUTION</h1>
          </div>
          <form
            className="space-y-4  min-w-[400px] m-h-[300px] p-10 bg-white rounded-2xl shadow-xl"
            onSubmit={(e) => handleLogin(e)}
          >
            <h1 className="p-5  text-primary text-center font-bold text-[30px] uppercase">
              Login Form
            </h1>
            <TextInputWithLabel
              inputType="text"
              onUpdate={setUsername}
              placeholder="Email"
              string={username}
              label="Email"
            />
            <TextInputWithLabel
              inputType="password"
              onUpdate={setPassword}
              placeholder="***********"
              string={password}
              label="Password"
            />
            <PrimaryButton
              title="login"
              isLoading={loading}
              isLock={!username || !password ? true : false}
              cusFunc={() => {}}
              type="submit"
            />
            {error && (
              <p className="text-error text-center font-semibold">{error}</p>
            )}
            <div className="bg-slate-300 py-5 px-2">
              <p>
                Forgot Password?{" "}
                <Link
                  to={"/password-retrieval"}
                  className="text-primary font-semibold hover:underline transition-all duration-300"
                >
                  {" "}
                  Retrive Password
                </Link>
              </p>
            </div>
          </form>
        </div>
        <p>All rights reserved by Akyerite Solutions</p>
      </div>
    );
  }
}

export default LoginPage;
