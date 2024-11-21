import { useGeneralStore } from "../../stores/general";
import FinishOverlay from "./FinishOverlay";

// import { useAuthStore } from "../../stores/authStore";
import AddAllowanceOverlay from "./AddAllowanceOverlay";
import AddDeductionOverlay from "./AddDeductionOverlay";

const AllOverlays = () => {
  // const user = useAuthStore((state) => state.userAuth);

  let isAddingAllowance = useGeneralStore((state) => state.isAddingAllowance);
  let isAddingDeduction = useGeneralStore((state) => state.isAddingDeduction);
  let isDoneWithBatch = useGeneralStore((state) => state.isDoneWithBatch);

  return (
    <>
      {/* <ClientOnly> */}

      {isAddingAllowance ? <AddAllowanceOverlay /> : null}
      {isAddingDeduction ? <AddDeductionOverlay /> : null}
      {isDoneWithBatch ? <FinishOverlay /> : null}
      {/* </ClientOnly> */}
    </>
  );
};

export default AllOverlays;
