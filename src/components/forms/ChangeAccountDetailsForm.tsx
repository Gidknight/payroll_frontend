import { ImProfile } from "react-icons/im";

import ChangeUsername from "./details/ChangeUsername";

import UserDetail from "./details/UserDetail";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { axiosInstance } from "../../libs";
import UserQuestion from "./details/UserQuestion";

const ChangeAccountDetailsForm = ({ user_id }: { user_id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/" + user_id);

        if (response.status == 200) {
        }
        // console.log(response.data.answer);
        setUser(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px]">{<ImProfile />}</span>
          <h2 className="header-text truncate w-full">Account Details</h2>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-normal gap-5 p-5">
        {user?.username && <ChangeUsername value={user?.username || ""} />}

        {(String(user?.phone_number) == "" || user?.phone_number) && (
          <UserDetail
            inputType="number"
            title="Phone Number"
            user_id={user_id}
            value={user?.phone_number || ""}
            // subText="(A valid phone number)"
          />
        )}

        {(String(user?.email) == "" || user?.email) && (
          <UserDetail
            inputType="email"
            title="Email Address"
            user_id={user_id}
            value={user?.email}
          />
        )}
        {(String(user?.first_name) == "" || user?.first_name) && (
          <UserDetail
            inputType="text"
            title="First Name"
            user_id={user_id}
            value={user?.first_name}
          />
        )}
        {(String(user?.surname) == "" || user?.surname) && (
          <UserDetail
            inputType="text"
            title="Surname"
            user_id={user_id}
            value={user?.surname}
          />
        )}
        {(String(user?.other_names) == "" || user?.other_names) && (
          <UserDetail
            inputType="text"
            title="Other Name"
            user_id={user_id}
            value={user?.other_names}
          />
        )}

        {
          <UserQuestion
            title={`Security Question`}
            subText={
              user?.question
                ? ""
                : "(Please setup your security question as you need this to retrieve your account)"
            }
            user_id={user_id}
            value={user?.question}
          />
        }
        {
          <UserDetail
            inputType="text"
            title="Answer"
            user_id={user_id}
            value={user?.answer}
            subText={
              user?.answer
                ? ""
                : "(Please setup your security answer as you need this to retrieve your account)"
            }
          />
        }
      </div>
    </div>
  );
};

export default ChangeAccountDetailsForm;
