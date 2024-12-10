import moment from "moment";
import { OrganizationTypes, PayslipReportTypes } from "../../types";

const now = moment().format("DD-MM-yyyy");

const COLORS = {
  primary: "#025627",
  deduction: "#fceaea",
  gray: "#afaeae",
  allowance: "#ebfcea",
  p: "#000",
};
const page = {
  flexDirection: "column",
  backgroundColor: "#fff",
  padding: 20,
  alignItems: "center",
  justifyContent: "space-between",
  color: COLORS.p,
  // fontFamily: Font.register("roboto"),
};
const styles = {
  logo: {
    width: 80,
    height: 80,
    // borderRadius: "100%",
    alignContent: "center",
  },
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    width: "100%",
  },
  header: {
    pTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subheader: {
    pTransform: "uppercase",
    fontSize: 14,
    fontWeight: "demibold",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    color: COLORS.p,
    // fontFamily: Font.register("roboto"),
  },
  body: {
    // flexDirection: "column",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
    borderTop: "1px",
    // paddingHorizontal: 10,
  },

  fullname: {
    pAlign: "center",
    backgroundColor: COLORS.primary,
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  biodata: {
    pAlign: "center",
    fontSize: 12,
    paddingVertical: 1,
  },
  bolden: {
    // fontWeight: "extrabold",
    // fontSize: 14,
    color: "red",
  },
  topic: {
    pAlign: "center",
    backgroundColor: COLORS.gray,
    color: "#000",
    fontSize: 14,
    fontWeight: "extrabold",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  deductionContainer: {
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 60,
  },
  deduction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: COLORS.deduction,
    paddingVertical: 2,
    paddingHorizontal: 15,
    // color: "white",
    pTransform: "capitalize",
    fontSize: 12,
    fontWeight: "light",
  },
  allowance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: COLORS.allowance,
    paddingVertical: 2,
    paddingHorizontal: 15,
    // color: "white",
    pTransform: "capitalize",
    fontSize: 12,
    fontWeight: "light",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px",
    width: "100%",
    paddingBottom: 5,
  },
  warning: {
    pAlign: "center",
    paddingHorizontal: 3,
    fontSize: 10,
    color: "#000",
    // backgroundColor: COLORS.gray,
  },
};

export default function PayslipDocumentHTML({
  staff,
  institute,
  forMail = true,
}: {
  staff: PayslipReportTypes;
  institute: OrganizationTypes;
  forMail?: boolean;
}) {
  return (
    // <div style={{}}>
    <div
      style={{
        width: "100%",
        borderTop: "1px black dashed",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 20,
        margin: "0 10px",
        alignItems: "center",
        justifyContent: "space-between",
        color: COLORS.p,
      }}
    >
      <div style={styles.body}>
        <div
          style={{
            ...styles.container,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={forMail ? "./public/logo.jpg" : "/logo.jpg"}
            alt="Institute Logo"
            style={styles.logo}
          />
          <p style={styles.header}>{institute?.OrganisationName}</p>
          <p style={styles.subheader}>{institute?.OrganisationAddress}</p>
          <p style={styles.subheader}>
            Payslip for the month of {staff?.month}, {staff?.year}
          </p>
        </div>

        <div style={styles.container}>
          <p style={styles.fullname}>
            Full Name: {staff?.surname}, {staff?.firstname} | Staff Number:{" "}
            {staff.staff_no}
          </p>
        </div>

        <div style={styles.container}>
          <p style={styles.biodata}>
            Email Address: <p>{staff?.email_address}</p>
          </p>
          <p style={styles.biodata}>
            Account Details:{" "}
            <p>
              {staff?.account?.bank_name} | {staff?.account?.account_number}
            </p>
          </p>
          <p style={styles.biodata}>
            Pension Account Details: <p> {staff?.account?.pension_acct_id}</p> |{" "}
            <p> {staff?.account?.pension_acct_no}</p>
          </p>
          <p style={styles.biodata}>
            Department: <p> {staff?.jobs?.sub_unit?.name}</p>
          </p>

          {/* new update */}

          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              width: "100%",
            }}
          >
            <p style={styles.biodata}>
              Scale: <p> {staff?.jobs?.salary_scale?.name}</p>
            </p>
            <p style={styles.biodata}>
              Level: <p> {staff?.jobs?.salary_scale?.level}</p>
            </p>
            <p style={styles.biodata}>
              Step:
              <p> {staff?.jobs?.salary_scale?.step}</p>
            </p>
          </div>
        </div>

        <div style={styles.deductionContainer}>
          <p style={styles.topic}>Earning Summary</p>
          <div style={styles.allowance}>
            <p>BASIC SALARY</p>
            <p>NGN {staff?.jobs?.amount?.toLocaleString("en-US")}</p>
          </div>
          {staff?.allowances &&
            staff.allowances.map((allow, index) => (
              <div style={styles.allowance} key={index}>
                <p>{allow?.Name} </p>
                <p>NGN {allow?.Amount?.toLocaleString("en-US")} </p>
              </div>
            ))}
          <div style={styles.allowance}>
            <p>Total Allowance:</p>
            <p style={{ color: "green" }}>
              NGN {staff?.total_allowance?.toLocaleString("en-US")}
            </p>
          </div>
          <div style={styles.allowance}>
            <p>Gross Pay:</p>
            <p style={{ color: "blue" }}>
              NGN {staff?.gross_pay?.toLocaleString("en-US")}
            </p>
          </div>
          <div style={styles.allowance}>
            <p>Net Pay:</p>
            <p style={{ color: "blue" }}>
              NGN {staff?.net_pay?.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <div style={styles.deductionContainer}>
          <p style={styles.topic}>Deduction Summary</p>
          {staff?.deductions &&
            staff.deductions.map((deduct, index) => (
              <div style={styles.deduction} key={index}>
                <p>{deduct?.Name} </p>
                <p>NGN {deduct?.Amount?.toLocaleString("en-US")}</p>
              </div>
            ))}

          <div style={styles.deduction}>
            <p>Total Deduction:</p>
            <p style={styles.bolden}>
              NGN {staff?.total_deduction?.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
      {/* footer */}
      <div style={styles.footer}>
        <p style={styles.warning}>
          Any alteration to this payslip render it invalid
        </p>
        <p style={styles.warning}>{now}</p>
      </div>
    </div>
    // </div>
  );
}
