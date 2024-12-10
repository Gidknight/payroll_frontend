import { useEffect, useState } from "react";

import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { logout } from "../utils/requests";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import { axiosInstance } from "../libs";

const Topbar = () => {
  const navigate = useNavigate();
  const userAuth = useAuthStore((state) => state.userAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState("");

  const [staffNumber, setStaffNumber] = useState("");
  const [name, setName] = useState("");

  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // const entry_id = session?.data?.entry_id
      const response = { status: 201 };
      // const response = await logout({
      //   entry_id: userAuth.entry_id,
      //   user_id: userAuth?.id,
      // });
      if (response.status == 201) {
        clearUser();
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error Logging Out");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // router.push("/");
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/staff/search", {
        staff_number: staffNumber,
        name: name.toUpperCase(),
      });
      if (response.status == 200) {
        toast.success(response.data.message);
        // navigate(`/staff/view-data/${response.data.staff.Id}`, {
        //   replace: true,
        // });
        window.location.replace(`/staff/view-data/${response.data.staff.Id}`);
        setName("");
        setStaffNumber("");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Error Making request");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/datedOn/current");
        if (response.status == 200) {
          setCurrent(`${response?.data?.Month} ${response?.data?.Year}`);
        }
      } catch (error: any) {
        console.log(error?.response?.data?.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-row items-center justify-between bg-slate-400 bg-opacity-50 py-3 px-20 shadow-md sticky top-0">
      <h1 className="font-extrabold text-2xl text-primary uppercase w-full">
        <span className="text-sm font-normal capitalize">Hello again, </span>
        {userAuth?.username}
      </h1>

      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-nowrap">Working Month:</p>
        <h2 className="text-nowrap text-lg font-bold">{current}</h2>
      </div>
      <div className="w-full flex flex-row items-center justify-end bg- gap-5">
        {/* <Link
          to="/sales/make-sale"
          className="flex flex-row items-center justify-start gap-2 text-primary border border-secondary text-center rounded-full p-2 hover:text-neutral hover:bg-secondary hover:shadow-md transition-all duration-300"
        >
          <p>{<BiCart size={22} />}</p>
          {myCart.length > 0 && (
            <span className="text-xs text-red-600 font-bold ">
              {myCart.length}
            </span>
          )}
          <p>{!myCart.length ? "Cart Is Empty" : "Products In Cart"}</p>
        </Link> */}
        <div className="flex flex-row items-center justify-center gap-1">
          <TextInput
            inputType="text"
            placeholder="Staff Number"
            isDisabled={isLoading}
            isRequired={true}
            onUpdate={setStaffNumber}
            string={staffNumber}
          />
          <TextInput
            inputType="text"
            placeholder="First Name"
            isDisabled={isLoading}
            isRequired={true}
            onUpdate={setName}
            string={name}
          />
          <div>
            <PrimaryButton
              isLoading={isLoading}
              title="Search"
              type={"button"}
              cusFunc={handleSearch}
            />
          </div>
        </div>

        {/* {userAuth.id && (
          <button
            className="flex flex-row items-center justify-start gap-2 text-primary border border-secondary text-center rounded-full p-2 hover:text-neutral hover:bg-secondary hover:shadow-md transition-all duration-300"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {<BiLogOut size="22" />}
            <span>{isLoading ? "..." : "LogOut"}</span>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Topbar;
