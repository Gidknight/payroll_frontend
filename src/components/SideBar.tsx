import { NAV_LINKS } from "../constants";
import { NavLink, NavLinkWithSub, SecondaryButton } from ".";
import { useAuthStore } from "../stores/authStore";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import { useState } from "react";

const SideBar = () => {
  // const store = await getStoreData();
  // console.log({ store });
  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useAuthStore((state) => state.userAuth);
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
  return (
    <div className="flex flex-col items-center justify-between h-screen w-full shadow-lg bg-primary overflow-y-auto ">
      <div className="w-full ">
        {/* <StoreName storeData={store[0]} /> */}
        <ul className="w-full flex flex-col gap-2 items-start justify-start p-2 overflow-y-auto bg-primary">
          {NAV_LINKS.map((link: any, index: number) =>
            link.hasSub && link.subMenu ? (
              <NavLinkWithSub
                key={index}
                label={link?.title}
                icon={link?.icon}
                prefix={"/" + link?.title}
                submenu={link.subMenu}
              />
            ) : (
              <NavLink
                key={index}
                label={link?.title}
                icon={link?.icon}
                href={link?.link}
              />
            )
          )}
        </ul>
      </div>
      <div className="bg-white w-full p-2 flex flex-col items-center">
        {userAuth.id && (
          <div className="w-24">
            <SecondaryButton
              cusFunc={handleLogout}
              isLoading={isLoading}
              title={isLoading ? "..." : "LogOut"}
              isLock={isLoading}
            />
          </div>
        )}
        {/* <button
            className="flex flex-row items-center justify-start gap-2 text-primary border border-secondary text-center rounded-full p-2 hover:text-neutral hover:bg-secondary hover:shadow-md transition-all duration-300"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {<BiLogOut size="22" />}
            <span>{isLoading ? "..." : "LogOut"}</span>
          </button> */}
      </div>
    </div>
  );
};

export default SideBar;
