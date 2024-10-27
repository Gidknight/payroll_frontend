"use client";

const Header = ({
  location = "location",
  subtext,
}: {
  location: string;
  subtext?: string;
}) => {
  return (
    <div className="bg-primary text-white rounded-xl  p-5 w-full md:flex flex-col md:flex-row gap-2 items-start justify-between">
      <div className="hidden md:block">
        <h2 className="text-xl font-bold uppercase">{location}</h2>
        <h2 className="text-md font-thin italic capitalize">{subtext}</h2>
      </div>
    </div>
  );
};

export default Header;
