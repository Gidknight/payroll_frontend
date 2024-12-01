import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { Header, BackBTN, TitleForm, ConfigTable } from "../components";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { BiEdit } from "react-icons/bi";
import PrimaryButton from "../components/PrimaryButton";
import { TitleTypes } from "../types";
import { getAllTitles } from "../utils/requests";
import { axiosInstance } from "../libs";
import toast from "react-hot-toast";
import TextInputWithCopy from "../components/TextInputWithCopy";
import Deletor from "../components/forms/Deletor";

const ConfigTitlesPage = () => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [titleID, setTitleID] = useState("");
  const [titleName, setTitleName] = useState("");
  const [title, setTitle] = useState<TitleTypes | null>(null);

  const [data, setData] = useState<TitleTypes[]>([]);

  const handleSelect = async (id: number) => {
    if (id) {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/titles/" + id);
        if (response.status == 200) {
          setTitle(response.data);
          setTitleName(response.data.Name);
          setTitleID(response.data.id);
        }
      } catch (error) {
        toast.error("Error getting Title Details");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (titleID) {
      try {
        setUpdating(true);
        const response = await axiosInstance.patch(`/titles/${titleID}`, {
          id: titleID,
          Name: titleName,
          old: title?.Name,
        });

        if (response?.status == 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      } catch (error) {
        toast.error("Error Updating Title Details");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (titleID) {
      try {
        setUpdating(true);
        const response = await axiosInstance.delete(`/titles/${titleID}`);

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
      const response = await getAllTitles();
      if (response.status == 200) {
        setData(response?.data);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <main className="wrapper">
        <Header location="Titles Configuration" />
        <div>
          <BackBTN />
        </div>
        <TitleForm purpose="title" />
        <div className="flex flex-row items-start justify-evenly w-full gap-10">
          <div className="w-1/2">
            <ConfigTable
              data={data}
              showFunction={handleSelect}
              title="Titles"
            />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-start gap-10">
            <div
              className={`w-full border-t-4 bg-white py-2 ${
                title ? " border-live" : " border-secondary"
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
                {!loading && title && (
                  <div className="w-full py-5 px-10">
                    <TextInputWithCopy
                      inputType="number"
                      label="Title ID"
                      value={String(title.id)}
                    />
                    <TextInputWithLabel
                      inputType="text"
                      isDisabled={updating}
                      isRequired={true}
                      label="Title"
                      string={titleName}
                      onUpdate={setTitleName}
                      placeholder={title?.Name || "Name Is Required"}
                      error=""
                    />

                    <div className="w-full flex flex-row items-center justify-end  py-2">
                      <PrimaryButton
                        cusFunc={handleUpdate}
                        isLock={loading || updating || !titleName}
                        isLoading={updating}
                        title="Submit"
                        type={"submit"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {title && (
              <Deletor
                answer={String(title.id)}
                label="Delete Title"
                placeholder="Title Id Must Be Provided"
                question="Provide the Title ID"
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

export default ConfigTitlesPage;
