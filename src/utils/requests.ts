import axios from "axios";
import { ProductFormTypes } from "../types";

const API_ENDPOINT = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({ baseURL: API_ENDPOINT });
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface UserDataTypes {
  user_id: string;
  signin: boolean;
}

// const date = moment().toDate()
// const CMonth = date.getMonth() + 1
// const CYear = date.getFullYear()

// ///////////////////////////////////////////////

///////////////////////////// BANK NAMES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const getAllBanks = async () => {
  const response = await axiosInstance.get("/bankNames");

  return response;
};

export const getAllTitles = async () => {
  const response = await axiosInstance.get("/titles");

  return response;
};

export const getAllDesignations = async () => {
  const response = await axiosInstance.get("/designations");

  return response;
};

export const getAllUnits = async () => {
  const response = await axiosInstance.get("/units");

  return response;
};

export const getAllDivisions = async () => {
  const response = await axiosInstance.get("/divisions");

  return response;
};

export const getAllJobClassifications = async () => {
  const response = await axiosInstance.get("/classifications");

  return response;
};

export const getAllSubunits = async () => {
  const response = await axiosInstance.get("/subunits");

  return response;
};

export const createUser = async (body: {
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  user_name: string;
  password: string;
  contact: string;
  role: string;
  user_id?: string;
}) => {
  if (!body) return;
  const response = await axiosInstance.post("/user", body);
  return response;
};

////////////////////////////////////////////////////////////////////

export const getDashboard = async () => {
  const res = await axiosInstance.get("/dashboard");

  return res;
};

///////////////////////////// CATEGORY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const getAllCategories = async () => {
  const response = await axiosInstance.get("/category");

  return response;
};

export const getSingleCategory = async (category_id: string) => {
  const response = await axiosInstance.get("/category/" + category_id);

  return response;
};

export const createCategory = async (body: {
  user_id: string;
  name: string;
}) => {
  const response = await axiosInstance.post("/category", body);
  return response;
};

export const updateCategory = async (body: {
  id: string;
  name: string;
  user_id: string;
  status: boolean;
}) => {
  const response = await axiosInstance.patch("/category/" + body.id, body);

  return response;
};

///////////////////////////////////////////////////////////////////////////////

//////////////////////// SUPPLIER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const getAllSuppliers = async () => {
  const response = await axiosInstance.get("/supplier");

  return response;
};

export const getSingleSupplier = async (supplier_id: string) => {
  const response = await axiosInstance(`/supplier/${supplier_id}`);
  return response;
};

export const updateSupplier = async (body: {
  id: string;
  user_id: string;
  name: string;
  status: boolean;
  contact: string;
  email: string;
  address: string;
}) => {
  const response = await axiosInstance.patch(`/supplier/${body.id}`, body);
  return response;
};

export const createSupplier = async (body: {
  user_id: string;
  name: string;
  contact: string;
  address: string;
  email: string;
}) => {
  const response = await axiosInstance.post("/supplier", body);
  return response;
};
////////////////////////////////////////////////////////////////////

//////////////////// STORE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const getStoreData = async () => {
  const response = await axiosInstance.get(`/admin/store`);

  return response;
};

export const createStoreData = async (body: {}) => {
  const response = await axiosInstance.post(`/admin/store`, body);

  return response;
};

export const updateStoreData = async (body: {}) => {
  const response = await axiosInstance.patch(`/admin/store`, body);

  return response;
};

/////////////////////////////////////////////////////////////////////////////

////////////////////// CUSTOMERS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const getSingleCustomer = async (cus_id: string) => {
  const response = await axiosInstance.get(`/customer/${cus_id}`);
  return response;
};

export const getAllCustomers = async () => {
  const response = await axiosInstance.get("/customer");

  return response;
};

export const getAllCreditors = async () => {
  const response = await axiosInstance.get("/customer/creditors");

  return response;
};

export const searchCustomer = async (search_param: string) => {
  if (!search_param) return;
  const response = await axiosInstance.get("/customer/search/" + search_param);

  return response;
};

export const updateCustomerDetail = async (data: {
  id: string;
  value: string | number;
  type: string;
  user_id: string;
}) => {
  if (!data) return;
  const response = await axiosInstance.patch(`/customer/${data.id}`, data);

  return response;
};

export const createCustomer = async (body: {
  first_name: string;
  last_name: string;
  dob: string;
  contact: string;
  email: string;
  other_name?: string;
  address?: string;
  nin?: string;
  bvn?: string;
  deposit: string;
  user_id: string;
}) => {
  if (!body) return;
  const response = await axiosInstance.post(`/customer`, body);

  return response;
};

export const makePayment = async (body: {
  customer_id: string;
  amount: number;
  mode_of_payment: string;
  user_id: string;
}) => {
  if (!body) return;
  const response = await axiosInstance.post(`/customer/payment`, body);

  return response;
};

/////////////////////////////////////////////////////////////////////////

/////////////////////////// Sales \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const makeSale = async (salesBody: {}) => {
  if (!salesBody) return;
  const response = await axiosInstance.post("/sales", salesBody);
  return response;
};

export const sellOnCredit = async (salesBody: {
  user_id: string;
  customer_id: string;
  start_date: string;
  due_date: string;
  discount?: number;
  cash_change?: number;
  total: number;
  initial_payment: number;
  review?: string;
  cart: [];
}) => {
  if (!salesBody) return;
  const response = await axiosInstance.post("/sales/sell-on-credit", salesBody);
  return response;
};

export const getSalesHistory = async () => {
  const response = await axiosInstance.get("/sales");
  return response;
};

export const getSingleSaleDetail = async (sale_id: number) => {
  const response = await axiosInstance.get(`/sales/detail/${sale_id}`);
  return response;
};

///////////////////////////////////

// Reports
export const getAllHistoryLogs = async (user_id: string) => {
  if (!user_id) return;
  const response = await axiosInstance.post("/reports/log-history", {
    user_id,
  });

  return response;
};

export const getInventoryReport = async (user_id: string) => {
  if (!user_id) return;
  const response = await axiosInstance.post("/reports/inventory", { user_id });

  return response;
};

export const getReport = async (
  body: {
    user_id: string;
    start: string;
    end: string;
    staff_id?: string;
  },
  type = ""
) => {
  if (!body || !type) return;

  const response = await axiosInstance.post("/reports/" + type, body);

  // if (type === 'sales') {
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/report/sales', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  //   })
  //   response = await res.json()
  // } else if (type === 'payments') {
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/report/payments', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  //   })
  //   response = await res.json()
  // } else if (type === 'credits') {
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/report/credits', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  //   })
  //   response = await res.json()
  // } else if (type === 'staff-sales') {
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/report/staff-sales', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  //   })
  //   response = await res.json()
  // }
  return response;
};

////////////////////////////////////// ANALYSIS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export const getStaticAnalysis = async () => {
  const response = await axiosInstance.get("/analysis");
  return response;
};

// export const getTopFives = async (data: { type: string; month: number }) => {
//   if (!data?.type) return
//   if (data.type === 'products') {
//     const response = await axiosInstance.post('/analysis/top-products', data)
//     return response
//   } else if (data.type === 'suppliers') {
//     const response = await axiosInstance.post('/analysis/top-suppliers', data)
//     return response
//   } else if (data.type === 'categories') {
//     const response = await axiosInstance.post('/analysis/top-categories', data)
//     return response
//   }
// }
export const getTopFives = async (data: { type: string; month: number }) => {
  if (!data?.type) return;

  // Define a mapping of types to their respective API endpoints
  const endpoints: Record<string, string> = {
    products: "/analysis/top-products",
    suppliers: "/analysis/top-suppliers",
    categories: "/analysis/top-categories",
  };

  // Get the endpoint based on the provided type
  const endpoint = endpoints[data.type];
  if (!endpoint) return; // Return early if the type doesn't match any known endpoint

  // Make the API request
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("Error fetching top fives:", error);
    // Handle error as needed, e.g., throw error or return a default value
    throw error; // or return a custom error message
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const logout = async (body: { user_id: string; entry_id: string }) => {
  const response = await axiosInstance.patch(
    "/entryLog/" + body.entry_id,
    body
  );
  return response;
};
