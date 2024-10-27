import { NAV_LINKS } from "../constants";
import { NavLink, NavLinkWithSub } from ".";

const SideBar = () => {
  // const store = await getStoreData();
  // console.log({ store });
  return (
    <div className="flex flex-col items-center justify-between h-screen w-full shadow-lg bg-primary overflow-y-auto ">
      <div className="w-full">
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
    </div>
  );
};

export default SideBar;
