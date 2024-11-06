import { useGeneralStore } from "../../stores/general";

// import { useAuthStore } from "../../stores/authStore";
import AddAllowanceOverlay from "./AddAllowanceOverlay";
import AddDeductionOverlay from "./AddDeductionOverlay";

const AllOverlays = () => {
  // const user = useAuthStore((state) => state.userAuth);

  let isAddingAllowance = useGeneralStore((state) => state.isAddingAllowance);
  let isAddingDeduction = useGeneralStore((state) => state.isAddingDeduction);

  return (
    <>
      {/* <ClientOnly> */}

      {isAddingAllowance ? <AddAllowanceOverlay /> : null}
      {isAddingDeduction ? <AddDeductionOverlay /> : null}
      {/* </ClientOnly> */}
    </>
  );
};

export default AllOverlays;
