export interface ButtonTypes {
  text: string;
  customFunction: () => {};
  isLoading: boolean;
}

export interface AccountTypes {
  bank_name_id: number;
  bank_name: string;
  account_number: string;
  sortcode: string;
  pension_acct_id: number;
  pension_acct_name: string | null;
  pension_acct_no: string | null;
  dated_on_id: number;
  Name: string;
}

export interface SalaryScaleTypes {
  id: number;
  level: string;
  step: string;
  name: string;
  Name: string;
}

export interface SubUnitTypes {
  id: number;
  Name: string;
  UnitId?: number;
}

export interface JobsTypes {
  month: string;
  year: number;
  amount: string;
  payable_month: number;
  total_month: number;
  hired_date: string;
  status: string | null;
  classification: TitleTypes;
  division: TitleTypes;
  designation: TitleTypes;
  salary_scale: SalaryScaleTypes;
  sub_unit: SubUnitTypes;
  unit: TitleTypes;
  date: {
    month: string;
    year: number;
    status: string;
  };
  all_sub_units: SubUnitTypes[];
}

export interface AllowanceTypes {
  id: number;
  Name: string;
  AccountName: string | null;
  AccountNumber: string | null;
  Codes: string | null;
}
export interface IndividualAllowanceTypes {
  id: number;
  NameId: number;
  IndividualId: number;
  Amount: number;
  DatedOnId: number;
  Name: string;
  AllowanceNames: AccountTypes;
}

export interface IndividualDeductionTypes {
  id: number;
  NameId: number;
  IndividualId: number;
  Amount: number;
  DatedOnId: number;
  Name: string;
  DeductionNames: AllowanceTypes;
}

export interface StaffDetailsTypes {
  id: number;
  title: TitleTypes;
  surname: string;
  firstname: string;
  other_name?: string;
  staff_no: string;
  other_no?: string;
  gender: string | null;
  email_address: string | null;
  dob: any;
  account: AccountTypes;
  jobs: JobsTypes;
  allowances: IndividualAllowanceTypes[];
  deductions: IndividualDeductionTypes[];
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
  designations?: TitleTypes[];
  classifications?: TitleTypes[];
}

export interface DatalistOptionsTypes {
  id: number;
  Name: string;
}

export interface PageTypes {
  id: number;
  title: string;
  to: string;
  icon: any;
}

export interface DatedOnTypes {
  id: number;
  Month: string;
  Year: number;
  Dated: number;
  Status?: string;
}

export interface ReportType {
  id: number;
  staff_no: string;
  full_names: string;
  level: string;
  bank: string;
  unit: string;
  subunit: string;
  allowances: { name: string; amount: number }[];
  deductions: { name: string; amount: number }[];
  basic_salary: number;
  total_allowance: number;
  total_deductions: number;
  payable_month: number;
  total_month: number;
  gross_pay: number;
  net_pay: number;
}

export interface ReportColumnsTypes {}
export interface MasterReportTypes {
  title: string;
  date: { Month: string; Year: Number };
  organization: {
    OrganisationName: string;
    OrganisationAddress: string;
    OtherInfo1?: string;
    OtherInfo2?: string;
  };
  summations: {
    total_allowance: number;
    total_deduction: number;
    total_basic: number;
    total_gross: number;
    total_netpay: number;
    no_of_staff: number;
  };
  available_allowances: { name: string; total: number }[];
  available_deductions: { name: string; total: number }[];
  report: ReportType[][];
  columns: string[];
}

export interface HistoryLogTypes {
  title: string;
  date: { Month: string; Year: Number };
  organization: {
    OrganisationName: string;
    OrganisationAddress: string;
    OtherInfo1?: string;
    OtherInfo2?: string;
  };
  records: [][];
  // records: { id: number; staff: string; action: string; createdAt: string }[];
  columns: string[];
}

export interface UploadStatTypes {
  total: number;
  success: number;
  failures: { id: number; staff_number: string; message: string }[];
}
export interface UserIDType {
  user_id: string;
}

export interface User {
  id: string;
  username: string;
  surname: string;
  first_name: string;
  other_names?: string;
  status: boolean;
  role: string;
  email: string;
  email_status?: boolean;
  phone_number: string;
  contact_status?: boolean;
  password?: string;
  // address?: string;
}

export interface AuthUserTypes {
  id: string;
  username: string;
  email: string;
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

export interface GraphDataTypes {
  month: string | number;
  gross_pay?: number;
  net_pay?: number;
  allowance?: number;
  deduction?: number;
  total_staff?: number;
  basic_salary?: number;
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
