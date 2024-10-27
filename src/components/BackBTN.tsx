import { BiArrowBack } from "react-icons/bi";

const BackBTN = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex flex-row items-center border border-primary justify-center gap-2 p-2 rounded-xl text-secondary font-bold hover:shadow-lg hover:text-primary transition-all duration-200"
    >
      <span className="text-[22px]">
        <BiArrowBack />
      </span>
      <span>Previous</span>
    </button>
  );
};

export default BackBTN;
