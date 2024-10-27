// import electronLogo from './assets/electron.svg'

import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./components";
import axios from "axios";
import TextInputWithLabel from "./components/TextInputWithLabel";
import { BiLock, BiUser } from "react-icons/bi";
import { useAuthStore } from "./stores/authStore";
import { useGeneralStore } from "./stores/general";

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
    const setStoreData = useGeneralStore((state) => state.setStoreData);
    const handleLogin = async (e: FormEvent) => {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          {
            user_name: username,
            password,
          }
        );

        // console.log(response.data)
        const { token, user, store } = response?.data;
        localStorage.setItem("token", token);
        setUser(user);
        setStoreData(store);
        setAuth(true);
        navigate("/dashboard");
      } catch (error: any) {
        console.log("Error Logging in ==>>", error);
        if (error.status == 400) {
          setError("Invalid Credentials");
        } else if (error.status == 500) {
          setError("Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-20 p-10">
        <form
          className="space-y-4 my-auto min-w-[400px] m-h-[300px] p-10 bg-white rounded-2xl shadow-xl"
          onSubmit={(e) => handleLogin(e)}
        >
          <h1 className="p-5  text-primary text-center font-bold text-[30px] uppercase">
            Login Form
          </h1>
          <TextInputWithLabel
            inputType="text"
            onUpdate={setUsername}
            placeholder="Username"
            string={username}
            label="Username"
            icon={<BiUser />}
          />
          <TextInputWithLabel
            inputType="password"
            onUpdate={setPassword}
            placeholder="*****"
            string={password}
            label="Password"
            icon={<BiLock />}
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
        </form>
      </div>
    );
  }
}

export default LoginPage;
