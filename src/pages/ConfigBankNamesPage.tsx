import { useEffect, useState } from "react";
import Layout from "../layout";
import { Header, BackBTN, BankForm, BankTable } from "../components";
import TextInputWithLabel from "../components/TextInputWithLabel";

import PrimaryButton from "../components/PrimaryButton";
import { BankTypes } from "../types";
import { getAllBanks, getSingleBank } from "../utils/requests";
import toast from "react-hot-toast";
import { axiosInstance } from "../libs";
import Deletor from "../components/forms/Deletor";
import TextInputWithCopy from "../components/TextInputWithCopy";

const ConfigBankNamesPage = () => {
  const [loading, setLoading] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [id, setID] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [sortcode, setSortcode] = useState<number | null>(null);
  const [data, setData] = useState<BankTypes[]>([]);
  const [bankData, setBankData] = useState<BankTypes | null>(null);

  const handleSelect = async (id: number) => {
    if (id) {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/bankNames/" + id);
        if (response.status == 200) {
          setBankData(response.data);
          setName(response.data.Name);
          setID(response.data.id);
          setSortcode(response.data.Sortcode);
        }
      } catch (error) {
        toast.error("Error getting Bank Details");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (id) {
      try {
        setUpdating(true);
        const response = await axiosInstance.patch(`/bankNames/${id}`, {
          id: id,
          Name: name?.toUpperCase(),
          Sortcode: sortcode,
        });

        if (response?.status == 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      } catch (error) {
        toast.error("Error Updating Bank Details");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        setUpdating(true);
        const response = await axiosInstance.delete(`/bankNames/${id}`);

        if (response?.status == 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      } catch (error) {
        toast.error("Error Updating Bank Details");
      } finally {
        setUpdating(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBanks();
      if (response.status == 200) {
        setData(response?.data);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Bank Names Configuration" />
        <div>
          <BackBTN />
        </div>
        <BankForm purpose="bank" />
        <div className="flex flex-row items-start justify-evenly w-full gap-10">
          <div className="w-1/2">
            <BankTable
              data={data}
              showFunction={handleSelect}
              title="Available Banks"
            />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-start gap-10">
            <div
              className={`w-full border-t-4 bg-white py-2 ${
                bankData ? " border-live" : " border-secondary"
              }`}
            >
              <h2 className="header-text text-center">Edit Panel</h2>

              <div className="w-full">
                {loading && (
                  <div>
                    <p className="text-center p-2 font-bold text-slate-700 animate-pulse">
                      Fetching Crop Details...
                    </p>
                  </div>
                )}
                {!loading && bankData && (
                  <div className="w-full py-5 px-10">
                    <TextInputWithCopy
                      inputType="number"
                      label="Bank ID"
                      value={String(bankData.id)}
                    />
                    <TextInputWithLabel
                      inputType="text"
                      isDisabled={updating}
                      isRequired={true}
                      label="Bank Name"
                      string={name}
                      onUpdate={setName}
                      placeholder={bankData?.Name || "Name Is Required"}
                      error=""
                    />
                    <TextInputWithLabel
                      inputType="number"
                      isDisabled={updating}
                      isRequired={true}
                      label="Sort Code"
                      string={sortcode}
                      onUpdate={setSortcode}
                      placeholder={bankData?.Sortcode || "Sort Code"}
                      error=""
                    />

                    <div className="w-full flex flex-row items-center justify-end  py-2">
                      <PrimaryButton
                        cusFunc={handleUpdate}
                        isLock={loading || updating || !name}
                        isLoading={updating}
                        title="Submit"
                        type={"submit"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {bankData && (
              <Deletor
                answer={String(bankData.id)}
                label="Delete Bank"
                placeholder="Bank Id Must Be Provideds"
                question="Provide the Bank ID"
                deleteFunction={handleDelete}
                user_id=""
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ConfigBankNamesPage;
