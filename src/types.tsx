export interface ButtonTypes {
  text: string;
  customFunction: () => {};
  isLoading: boolean;
}

export interface AccountTypes {
  bank_name_id: number;
  bank_name: string;
  account_number: string;
  pension_acct_id: number;
  pension_acct_name: string | null;
  pension_acct_no: string | null;
  dated_on_id: number;
}

export interface SalaryScaleTypes {
  id: number;
  level: string;
  step: string;
  name: string;
  grade_code: string;
}

export interface SubUnitTypes {
  id: number;
  Name: string;
  UnitId?: number;
}

export interface JobsTypes {
  amount: string;
  payable_month: number;
  total_month: number;
  salary_scale: SalaryScaleTypes;
  sub_unit: SubUnitTypes;
  date: {
    month: string;
    year: number;
    status: string;
  };
}

export interface AllowanceTypes {
  id: number;
  NameId: number;
  IndividualId: number;
  Amount: number;
  DatedOnId: number;
  AllowanceNames: {
    id: number;
    Name: string;
    AccountName: string | null;
    AccountNumber: string | null;
    Codes: string | null;
  };
}

export interface DeductionTypes {
  id: number;
  NameId: number;
  IndividualId: number;
  Amount: number;
  DatedOnId: number;
  DeductionNames: {
    id: number;
    Name: string;
    AccountName: string | null;
    AccountNumber: string | null;
    Codes: string | null;
  };
}

export interface StaffDetailsTypes {
  id: number;
  title: string;
  surname: string;
  firstname: string;
  other_name?: string;
  staff_no: string;
  email_address: string | null;
  dob: any;
  month: string;
  year: number;
  account: AccountTypes;
  jobs: JobsTypes;
  allowances: AllowanceTypes[];
  deductions: DeductionTypes[];
  total_allowance: number;
  total_deduction: number;
  payable_amount: number;
  gross_pay: string;
  net_pay: string;
  slip_status: string;
  units?: TitleTypes[];
  sub_units?: SubUnitTypes[];
  titles?: TitleTypes[];
  bank_names?: BankTypes[];
  pension_banks?: BankTypes[];
  salary_scales?: SalaryScaleTypes[];
  job_divisions?: TitleTypes[];
}

export interface DatalistOptionsTypes {
  id: number;
  Name: string;
}

export interface UserIDType {
  user_id: string;
}

export interface User {
  id: string;
  user_name: string;
  last_name: string;
  first_name: string;
  other_name?: string;
  status: boolean;
  role: string;
  email: string;
  email_status?: boolean;
  contact: string;
  contact_status?: boolean;
  password?: string;
  address?: string;
}

export interface AuthUserTypes {
  id: string;
  user_name: string;
  role: string;
  status: boolean;
  entry_id: string;
}
export interface AuthStoreTypes {
  userAuth: AuthUserTypes;
  setUser: (data: AuthUserTypes) => void;
  clearUser: () => void;
  auth: boolean;
  setAuth: (value: boolean) => void;
}

export interface TitleTypes {
  id: number;
  Name: string;
}

export interface BankTypes {
  id: number;
  Name: string;
  Sortcode?: number | string;
}

export interface ShowErrorObject {
  type: string;
  message: string;
}

export interface UploadError {
  type: string;
  message: string;
}

//////////////////////////////////////////////
//////////////////////////////////////////////

// COMPONENT TYPES
export interface TextInputCompTypes {
  string: number | string | any;
  inputType: string;
  placeholder: string;
  onUpdate: (newValue: number | string | any) => void;
  error?: string;
  label?: string;
  isDisabled?: boolean;
  // icon?: any;
  isRequired?: boolean;
}

export interface TextAreaCompTypes {
  string: string;

  placeholder: string;
  onUpdate: (newValue: string) => void;
  error: string;
  label?: string;
  isDisabled?: boolean;
  rows: number;
  isRequired?: boolean;
}

//////////////////////////////////////////////
//////////////////////////////////////////////

// LAYOUT INCLUDE TYPES
export interface MenuItemTypes {
  iconString: string;
  colorString: string;
  sizeString: string;
}

export interface NavItemTypes {
  text: string;
  link: string;
  icon: string;
}

export interface InnerObject {
  [key: string]: string | number; // Allows the object to have any string keys with string or number values
  quantity: number; // Ensure quantity is a number
}

export interface Element {
  [innerArray: string]: InnerObject[]; // Allows the object to have an array of InnerObject under any string key
}

export interface HistoryLogTypes {
  id: number | string;
  attendant?: string;
  action?: string;
  date?: string;
}

export interface StoreReportTypes {
  name: string;
  address: string;
  email: string;
  contact1?: number;
  contact2?: number;
}

export interface AttendantReportTypes {
  full_name: string;
  username: string;
  contact?: number;
  email?: string;
}

export interface InventoryReportTypes {
  store: StoreReportTypes;
  attendant: AttendantReportTypes;
  date: string;
  net_total: number;
  inventory: {
    id: string;
    name: string;
    supplier_name: string;
    quantity_left: number;
    cost_price: number;
    selling_price: number;
    total: number;
    reorder: string;
  }[];
}

export interface SalesReportTypes {
  store: StoreReportTypes;
  attendant: AttendantReportTypes;
  date: string;
  total_cash_sales: number;
  total_discount: number;
  staff_name?: string;
  sales: {
    id: string;
    customer_name: string;
    products: [];
    quantity: number;
    price: number;
    discount: number;
    amount_paid: number;
    change: number;
    date_paid: string;
    mode_of_payment: string;
    debt?: number;
    // profit: number;
  }[];
}

export interface PaymentReportTypes {
  store: StoreReportTypes;
  attendant: AttendantReportTypes;
  date: string;
  total_payment: number;
  total_card_payment: number;
  total_cash_payment: number;
  total_transfer_payment: number;
  total_customer: number;
  payments: {
    id: string;
    customer_name?: string;
    payment?: number;
    prev_balance: number;
    new_balance: number;
    interest?: number;
    date_paid: string;
    mode_of_payment: string;
    attendant: string;
    top_up: boolean;
  }[];
}

export interface CreditReportTypes {
  store: StoreReportTypes;
  attendant: AttendantReportTypes;
  date: string;
  total_credit_sales: number;
  total_discount: number;
  total_interest: number;
  credits: {
    id: string;
    customer_name: string;
    total: number;
    interest?: number;
    discount?: number;
    date_sold: string;
    start_date: string;
    end_date: string;
  }[];
}

export interface MiniAnalysisTypes {
  date: string;
  year: string;
  month: string;
  total_sold: number;
  total_categories: number;
  online_staffs: number;
  total_creditors: number;
  total_customers: number;

  total_suppliers: number;
  gross_products: number;
  gross_revenue: number;
  net_stock_value: number;
  current_stock_value: number;
  weekdays_sales_data: {};
}

export interface ProductUnitTypes {
  id: number;
  price: number;
  qty: number;
}

export interface ComboOptionsTypes {
  id: number | string | boolean;
  Name: string | number;
}
