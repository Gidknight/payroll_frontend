import { useEffect, useState } from "react";
import { BiDish, BiEdit } from "react-icons/bi";
import {
  TextInputWithLabel,
  ComboBox,
  TextAreaWithLabel,
  PrimaryButton,
  SecondaryButton,
  TextInputWithCopy,
  UnitsPicker,
} from "..";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";

import { ProductUnitTypes } from "../../types";
import { useAuthStore } from "@renderer/stores/authStore";
import {
  getAllCategories,
  getAllSuppliers,
  getAllUnits,
  getSingleProduct,
  updateProduct,
} from "@renderer/utils/requests";
import { useParams } from "react-router-dom";

interface ProductType {
  name: string;
  id: string;
  price: number;
  cost_price: number;
  quantity: number;
  status: boolean;
  description: string;
  retail: boolean;
  low_threshold: number;
  quantity_in_pack: number;
  unit_price: number;
  open_pack: number;
  category_id: string;
  supplier_id: string;
  category: { id: string; name: string };
  supplier: { id: string; name: string };
  units: ProductUnitTypes[];
}
const ProductDetails = (): JSX.Element => {
  const params = useParams();
  const product_id = params.id;
  const [categories, setCategories] = useState<any>([]);
  const [suppliers, setSuppliers] = useState<any>([]);
  const [units, setUnits] = useState<any>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [isRetail, setIsRetail] = useState<boolean>(false);
  const [unitPrice] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [quantityInPack, setQuantityInPack] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<ProductUnitTypes | null>(
    null
  );

  const user = useAuthStore((state) => state.userAuth);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleCancel = () => {
    // setName(detail.name)
    // setPrice(detail.price)
    // setCostPrice(detail.cost_price)
    // setQuantity(detail.quantity)
    // setStatus(detail.status)
    // setDescription(detail.description)
    // setCategory(detail.category.id)
    // setSupplier(detail.supplier.id)
    // setIsRetail(detail.retail)
    // setUnitPrice(detail.unit_price)
    // setSelectedUnit(detail?.units[0])
    // setThreshold(detail?.low_threshold)
    setEdit(false);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);

      const response = await updateProduct({
        name: name,
        price,
        cost_price: costPrice,
        quantity,
        status: status,
        supplier_id: supplier,
        category_id: category,
        description: description,
        retail: isRetail,
        units: selectedUnit,
        quantity_in_pack: quantityInPack,
        unit_price: unitPrice,
        low_threshold: threshold,
        user_id: user.id,
        id: product_id,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        handleCancel();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Error Occured, Product is not updated");
    } finally {
      setIsUpdating(false);
    }
  };

  // const handleOnChange = (event) => {
  //   event.preventDefault()
  //   const { name, value, type, checked } = event.target
  //   setProduct((prevState) => {
  //     return { ...prevState, [name]: type === 'checkbox' ? checked : value }
  //   })
  // }

  const fetchData = async (id: string) => {
    try {
      setLoading(true);

      const [_product, _categories, _suppliers, _units] = await Promise.all([
        getSingleProduct(id),
        getAllCategories(),
        getAllSuppliers(),
        getAllUnits(),
      ]);
      const _product_ = _product.data;
      // console.log(_product_.category)
      setProduct(_product_);
      setCategories(_categories.data);
      setSuppliers(_suppliers.data);
      setUnits(_units.data);
      setName(_product_.name);
      setCategory(_product_.category_id);
      setSupplier(_product_.supplier_id);
      setCostPrice(_product_?.cost_price);
      setDescription(_product_?.description);
      setIsRetail(_product_?.retail);
      setPrice(_product_?.price);
      setStatus(_product_?.status);
      setThreshold(_product_?.low_threshold);
      setQuantity(_product_?.quantity);
      setQuantityInPack(_product_?.quantity_in_pack);
      setSelectedUnit(_product_?.units[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (product_id) {
      fetchData(product_id);
    }
  }, []);

  return (
    <div className={product?.status ? "holder-active" : "holder-not-active"}>
      <div className="w-full flex flex-row items-center justify-between gap-3 pl-5">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="header-icon">{<BiDish />}</span>
          <h2 className="header-text whitespace-nowrap">Product Details</h2>
        </div>

        <button
          className="edit-btn"
          onClick={edit ? handleCancel : () => setEdit(true)}
        >
          <span>{!edit ? <BiEdit /> : <GiCancel />}</span>
          {!edit ? "edit" : "cancel"}
        </button>
      </div>

      <div className="w-full flex flex-col items-center justify-start gap-5">
        <div className="w-1/2 pt-5">
          <TextInputWithCopy
            inputType="text"
            label="Product ID"
            value={product_id}
          />
        </div>
        <div className="w-full flex flex-row items-start justify-center p-5 gap-5">
          <div className="flex flex-col items-center justify-between w-1/2 gap-5">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <TextInputWithLabel
                inputType="text"
                isDisabled={!edit}
                label="Product Name"
                string={name}
                onUpdate={setName}
                placeholder={`(Old Name: ${product?.name}), A New Name Is Required`}
                isRequired={true}
              />
              <TextInputWithLabel
                inputType="number"
                isDisabled={!edit}
                label="Cost Price"
                string={costPrice}
                onUpdate={setCostPrice}
                placeholder={`(Old Price: ${product?.cost_price}), A New Cost Price Is Required`}
                isRequired={true}
              />
              <TextInputWithLabel
                inputType="number"
                isDisabled={!edit}
                label="Selling Price"
                string={price}
                onUpdate={setPrice}
                placeholder={`(Old Price: ${product?.price}), A New Selling Price Is Required`}
                isRequired={true}
              />
              <TextInputWithLabel
                inputType="number"
                isDisabled={!edit}
                label="Product Quantity"
                string={quantity}
                onUpdate={setQuantity}
                placeholder={`(Old Quantity: ${product?.quantity}), A New Quantity Is Required`}
                isRequired={true}
              />

              <ComboBox
                defaultMessage={status ? "Available" : "Not Available"}
                value={status}
                showDefault={true}
                id={"status"}
                isDisabled={!edit}
                label={"Product Status"}
                onSelect={setStatus}
                options={[
                  { id: true, name: "Available" },
                  { id: false, name: "Not Available" },
                ]}
                error={""}
                subLabel={""}
              />

              <TextInputWithLabel
                inputType="number"
                isDisabled={!edit}
                label="Low Threshold"
                string={threshold}
                onUpdate={setThreshold}
                placeholder={`(Old Unit Price: ${product?.low_threshold}), A New Unit Price Is Required`}
                isRequired={true}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-center w-1/2 gap-5">
            <div className="w-full flex flex-col items-start justify-center gap-5">
              <ComboBox
                defaultMessage={product?.supplier?.name}
                value={supplier}
                showDefault={true}
                id={"suppliers"}
                isDisabled={!edit}
                label={"Product Supplier"}
                onSelect={setSupplier}
                options={suppliers}
                error={""}
                subLabel={""}
              />

              <ComboBox
                defaultMessage={product?.category?.name}
                value={category}
                showDefault={true}
                id={"category"}
                isDisabled={!edit}
                label={"Product Category"}
                onSelect={setCategory}
                options={categories}
                error={""}
                subLabel={""}
              />

              <div className="flex flex-row items-center justify-center gap-5">
                <label className="text-slate-600 text-lg font-bold">
                  Sellable in Units?
                </label>
                <input
                  className={edit ? `cursor-pointer` : `cursor-not-allowed`}
                  type="checkbox"
                  checked={isRetail}
                  onChange={(e) => setIsRetail(e.target.checked)}
                  disabled={!edit}
                />
              </div>
              {isRetail && (
                <div className="w-full space-y-4">
                  {/* <ComboBox
                    defaultMessage={detail?.Unit?.name}
                    value={unitID}
                    showDefault={true}
                    id={"unit"}
                    isDisabled={!edit}
                    label={"Unit Metric"}
                    onSelect={setUnitID}
                    options={units}
                    error={""}
                    subLabel={""}
                  /> */}
                  <UnitsPicker
                    options={units}
                    selected={selectedUnit}
                    setSelected={setSelectedUnit}
                    title="Sellable Units"
                    isDisabled={!edit}
                  />
                  {/* <TextInputWithLabel
                    inputType="number"
                    isDisabled={!edit}
                    label="Unit Price"
                    string={unitPrice}
                    onUpdate={setUnitPrice}
                    placeholder={`(Old Unit Price: ${detail?.unit_price}), A New Unit Price Is Required`}
                    isRequired={true}
                  /> */}
                  <TextInputWithLabel
                    inputType="number"
                    isDisabled={!edit}
                    label="Quantity in Pack"
                    string={quantityInPack}
                    onUpdate={setQuantityInPack}
                    placeholder={`(Old Quantity in Pack: ${product?.quantity_in_pack}), A Quantity in Pack Is Required`}
                    isRequired={true}
                  />
                </div>
              )}
            </div>

            <TextAreaWithLabel
              rows={4}
              label="Product Description"
              string={description}
              onUpdate={setDescription}
              placeholder={`Old Description: ${product?.description}`}
              isDisabled={!edit}
              isRequired={true}
              error=""
            />
          </div>
        </div>
        {edit && (
          <div className=" flex flex-row items-center justify-center gap-5 p-5">
            <PrimaryButton
              isLoading={isUpdating}
              title="Update"
              cusFunc={handleUpdate}
              type={"button"}
              isLock={
                !name ||
                !price ||
                !quantity ||
                !status ||
                !description ||
                !supplier ||
                !category
                  ? true
                  : false
              }
            />

            <SecondaryButton
              cusFunc={handleCancel}
              isLoading={isUpdating || loading}
              title="Cancel"
              isLock={!edit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
