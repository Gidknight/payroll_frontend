import React, { useState } from "react";
import Layout from "../layout";
import { Header, BackBTN, TitleForm, ConfigTable } from "../components";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { BiEdit } from "react-icons/bi";
import PrimaryButton from "../components/PrimaryButton";
import { TitleTypes } from "../types";

const ConfigPensionNamesPage = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<TitleTypes | null>(null);

  const handleUpdate = async () => {};
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Pension Names Configuration" />
        <div>
          <BackBTN />
        </div>
        <TitleForm purpose="pension name" />
        <div className="flex flex-row items-start justify-evenly w-full gap-10">
          <div className="w-1/2">
            <ConfigTable
              data={[]}
              showFunction={() => {}}
              title="Pension Names"
            />
          </div>

          <div
            className={`w-1/2 flex flex-col items-center justify-start border-t-4 bg-white py-2 ${
              edit ? " border-live" : " border-secondary"
            }`}
          >
            <h2 className="header-text text-center">Edit Panel</h2>
            {/* <div className="flex flex-row items-center justify-between w-full px-5">
              {titleID ? (
                <button
                  onClick={() => setEdit((prev) => !prev)}
                  className={`border-b hover:text-live hover:border-live transition-all duration-300 p-2`}
                >
                  <BiEdit />
                  {edit ? "Cancel" : "Edit"}
                </button>
              ) : (
                ""
              )}
            </div> */}
            <div className="w-full">
              {loading && (
                <div>
                  <p className="text-center p-2 font-bold text-slate-700 animate-pulse">
                    Fetching Crop Details...
                  </p>
                </div>
              )}
              {!loading && id && (
                <div className="w-full py-5 px-10">
                  <TextInputWithLabel
                    inputType="text"
                    isDisabled={!edit}
                    isRequired={true}
                    label="Unit Name"
                    string={name}
                    onUpdate={setName}
                    placeholder={unit?.name || "Name Is Required"}
                    error=""
                  />

                  <div className="w-full flex flex-row items-center justify-end  py-2">
                    <PrimaryButton
                      cusFunc={handleUpdate}
                      isLock={loading || updating || !edit || !name}
                      isLoading={updating}
                      title="Submit"
                      type={"submit"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ConfigPensionNamesPage;
