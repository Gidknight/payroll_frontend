import { useEffect, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import TextInputWithLabel from "../TextInputWithLabel";
import { Checkboxes, PrimaryButton, SearchDropdown, SecondaryButton } from "..";
import toast from "react-hot-toast";
import { useCartStore } from "../../stores/useCartStore";
import { ProductTypes, ShowErrorObject, SmallUnitTypes } from "../../types";

const SalesSelector = ({ products }: { products: ProductTypes[] }) => {
  const myCart = useCartStore((state: any) => state.myCart);
  const addToCart = useCartStore((state: any) => state.addToCart);
  const productDefault = {
    id: "",
    name: "",
    price: 0,
    cost_price: 0,
    quantity: 0,
    category_id: "",
    category_name: "",
    supplier_name: "",
    supplier_id: "",
    quantity_in_pack: 0,
    open_pack: 0,
    stoke: 0,
    retail: false,
    units: [],
  };
  const [, setProductID] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [, setUnitQuantity] = useState(0);
  const [productDetail, setProductDetail] =
    useState<ProductTypes>(productDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  // const [allProducts, setAllProducts] = useState<ProductTypes[] | null>(products)
  const [selectedUnits, setSelectedUnits] = useState<
    {
      id: number;
      price: number; //price here is the qty
    }[]
  >([]);

  // const [errorMessage, setErrorMessage] = useState('')
  const [, setError] = useState<ShowErrorObject | null>(null);

  // const showError = (type: string) => {
  //   if (error && Object.entries(error).length > 0 && error?.type == type) {
  //     return error.message
  //   }
  //   return ''
  // }

  const validate = () => {
    setError(null);
    let isError = false;

    if (productQuantity <= 0 && selectedUnits[0]?.price <= 0) {
      setError({ type: "quantity", message: "Quantity Is Required" });
      isError = true;
    } else if (productDetail.quantity < productQuantity) {
      setError({ type: "quantity", message: "Not Enough Item In Stoke" });
      isError = true;
    }
    return isError;
  };

  const getSelected = (id: number, units_array?: SmallUnitTypes[]) => {
    if (!units_array?.length) return;
    const selected = units_array.find((unit) => unit.id == id);

    return selected;
  };
  const moveToCart = async () => {
    setIsLoading(true);
    const isError = validate();
    if (isError) return;

    try {
      const selected_unit = getSelected(
        selectedUnits[0]?.id || productDetail?.units[0]?.id,
        productDetail?.units
      );
      // console.log("selected unit =>", selected_unit);
      addToCart({
        id: myCart.length + 1,
        price: productDetail.price,
        quantity: productQuantity,
        product_name: productDetail.name,
        product_id: productDetail.id,
        category_id: productDetail.category_id,
        category_name: productDetail.category_name,
        supplier_name: productDetail.supplier_name,
        supplier_id: productDetail.supplier_id,
        stoke: productDetail.quantity,
        cost_price: productDetail.cost_price,
        unit_price: selected_unit && selected_unit?.price,
        unit_quantity: selectedUnits[0]?.price || 0,
        unit_id: selected_unit?.id,
        unit_name: selected_unit?.name,
        retail: productDetail?.retail,
      });

      toast.success(`${productDetail.name} added to cart`);
      setProductDetail(productDefault);
      setProductID("");
      setSelectedUnits([]);
      setProductQuantity(0);
    } catch (error) {
      console.log(error);
      toast.error("Error: Item Not Added To Cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkLogic = () => {
      if (productDetail) {
        // console.log(productDetail);
        if (selectedUnits.length) {
          if (productQuantity > 0 || selectedUnits[0]?.price > 0) {
            setEnabled(true);
          } else {
            setEnabled(false);
          }
        } else {
          if (
            productQuantity > 0 &&
            productQuantity <= productDetail.quantity
          ) {
            // console.log("ran!!");
            setEnabled(true);
          } else {
            setEnabled(false);
          }
        }
      }
    };
    checkLogic();
  }, [productQuantity, selectedUnits]);

  const handleCancel = () => {
    setProductDetail(productDefault);
    setProductID("");
    setProductQuantity(0);
    setUnitQuantity(0);
  };

  return (
    <div className={!products?.length ? "holder-null" : "holder-active"}>
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="header-icon">
          <FaCashRegister />
        </span>
        <h2 className="header-text whitespace-nowrap">Register</h2>
      </div>
      <div
        onSubmit={moveToCart}
        className="flex flex-col items-center justify-center gap-2 p-3 w-full "
      >
        <SearchDropdown
          options={products?.length ? products : []}
          label={"Product name"}
          placeholder={"Search by Product Name"}
          setSelection={setProductDetail}
        />
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <TextInputWithLabel
            inputType="text"
            label="Product Name"
            string={productDetail?.name || ""}
            onUpdate={() => {}}
            placeholder="Product Name is Needed"
            isDisabled={true}
            isRequired={true}
          />
          <TextInputWithLabel
            inputType="text"
            label="Product Category"
            string={productDetail?.category_name || ""}
            onUpdate={() => {}}
            placeholder="Product Category is Needed"
            isDisabled={true}
            isRequired={true}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <TextInputWithLabel
            inputType="number"
            label="Product Price"
            string={productDetail.price}
            onUpdate={() => {}}
            placeholder={`Product Price is Needed`}
            isDisabled={true}
            isRequired={true}
          />
          <TextInputWithLabel
            inputType="number"
            label="Product Quantity"
            string={productQuantity}
            onUpdate={setProductQuantity}
            placeholder={`Only ${productDetail?.quantity} is in stock`}
            isDisabled={false}
            isRequired={true}
            error={""}
          />
        </div>
        {productDetail.retail && productDetail?.units?.length && (
          <div className="flex flex-row items-center justify-between gap-2 w-full">
            <Checkboxes
              options={productDetail?.units}
              title="Sellable Units"
              selected={selectedUnits}
              setSelected={setSelectedUnits}
              secondLabel="unit quantity"
            />
          </div>
        )}

        <div className="flex flex-row items-center justify-between w-full gap-5 pt-5">
          <SecondaryButton
            title="cancel"
            cusFunc={handleCancel}
            isLoading={isLoading}
          />
          <PrimaryButton
            title={"move to cart >>>"}
            type={"submit"}
            isLock={!enabled}
            isLoading={isLoading}
            cusFunc={moveToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesSelector;
