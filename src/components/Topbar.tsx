import { useEffect, useState } from "react";

import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import { logout } from "../utils/requests";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

const Topbar = () => {
  const userAuth = useAuthStore((state) => state.userAuth);
  const [isLoading, setIsLoading] = useState(false);

  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // const entry_id = session?.data?.entry_id
      const response = await logout({
        entry_id: userAuth.entry_id,
        user_id: userAuth?.id,
      });
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
  useEffect(() => {}, []);

  return (
    <div className="w-full flex flex-row items-center justify-between bg-slate-400 bg-opacity-50 py-3 px-20 shadow-md sticky top-0">
      <h1 className="font-extrabold text-2xl text-primary uppercase w-full">
        <span className="text-sm font-normal capitalize">Hello again, </span>
        {userAuth?.user_name}
      </h1>
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

        {userAuth.status && (
          <button
            className="flex flex-row items-center justify-start gap-2 text-primary border border-secondary text-center rounded-full p-2 hover:text-neutral hover:bg-secondary hover:shadow-md transition-all duration-300"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {<BiLogOut size="22" />}
            <span>{isLoading ? "..." : "LogOut"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
