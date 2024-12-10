import moment from "moment";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

const now = moment().format("DD-MM-yyyy");

const COLORS = {
  primary: "#025627",
  deduction: "#fceaea",
  gray: "#afaeae",
  allowance: "#ebfcea",
  text: "#000",
};
const styles = StyleSheet.create({
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
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subheader: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "demibold",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    color: COLORS.text,
    // fontFamily: Font.register("roboto"),
  },
  body: {
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
    borderTop: "1px",
    // paddingHorizontal: 10,
  },

  fullname: {
    textAlign: "center",
    backgroundColor: COLORS.primary,
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  biodata: {
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 1,
  },
  bolden: {
    // fontWeight: "extrabold",
    // fontSize: 14,
    color: "red",
  },
  topic: {
    textAlign: "center",
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
    textTransform: "capitalize",
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
    textTransform: "capitalize",
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
    textAlign: "center",
    paddingHorizontal: 3,
    fontSize: 10,
    color: "#000",
    // backgroundColor: COLORS.gray,
  },
});

const MyDocument = ({ staff, institute, forMail = true }) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.body}>
          <View style={styles.container}>
            <Image
              source={forMail ? "./public/logo.jpg" : "/logo.jpg"}
              style={styles.logo}
            />
            <Text style={styles.header}>{institute?.OrganisationName}</Text>
            <Text style={styles.subheader}>
              {institute?.OrganisationAddress}
            </Text>
            <Text style={styles.subheader}>
              Payslip for the month of {staff?.month}, {staff?.year}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.fullname}>
              Full Name: {staff?.surname}, {staff?.firstname} | Staff Number:{" "}
              {staff.staff_no}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.biodata}>
              Email Address: <Text>{staff?.email_address}</Text>
            </Text>
            <Text style={styles.biodata}>
              Account Details:{" "}
              <Text>
                {staff?.account?.bank_name} | {staff?.account?.account_number}
              </Text>
            </Text>
            <Text style={styles.biodata}>
              Pension Account Details:{" "}
              <Text> {staff?.account?.pension_acct_name}</Text> |{" "}
              <Text> {staff?.account?.pension_acct_no}</Text>
            </Text>
            <Text style={styles.biodata}>
              Department: <Text> {staff?.jobs?.sub_unit?.Name}</Text>
            </Text>

            {/* new update */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
                width: "100%",
              }}
            >
              <Text style={styles.biodata}>
                Scale: <Text> {staff?.jobs?.salary_scale?.name}</Text>
              </Text>
              <Text style={styles.biodata}>
                Level: <Text> {staff?.jobs?.salary_scale?.level}</Text>
              </Text>
              <Text style={styles.biodata}>
                Step:
                <Text> {staff?.jobs?.salary_scale?.step}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.deductionContainer}>
            <Text style={styles.topic}>Earning Summary</Text>
            <View style={styles.allowance}>
              <Text>BASIC SALARY</Text>
              <Text>
                NGN {parseFloat(staff?.jobs?.amount)?.toLocaleString("en-US")}
              </Text>
            </View>
            {staff?.allowances &&
              staff.allowances.map((allow, index) => (
                <View style={styles.allowance} key={index}>
                  <Text>{allow?.AllowanceNames?.Name} </Text>
                  <Text>NGN {allow?.Amount?.toLocaleString("en-US")} </Text>
                </View>
              ))}
            <View style={styles.allowance}>
              <Text>Total Allowance:</Text>
              <Text style={{ color: "green" }}>
                NGN{" "}
                {parseFloat(staff?.total_allowance)?.toLocaleString("en-US")}
              </Text>
            </View>
            <View style={styles.allowance}>
              <Text>Gross Pay:</Text>
              <Text style={{ color: "blue" }}>
                NGN {parseFloat(staff?.gross_pay)?.toLocaleString("en-US")}
              </Text>
            </View>
            <View style={styles.allowance}>
              <Text>Net Pay:</Text>
              <Text style={{ color: "blue" }}>
                NGN {parseFloat(staff?.net_pay)?.toLocaleString("en-US")}
              </Text>
            </View>
          </View>

          <View style={styles.deductionContainer}>
            <Text style={styles.topic}>Deduction Summary</Text>
            {staff?.deductions &&
              staff.deductions.map((deduct, index) => (
                <View style={styles.deduction} key={index}>
                  <Text>{deduct?.DeductionNames?.Name} </Text>
                  <Text>NGN {deduct?.Amount?.toLocaleString("en-US")}</Text>
                </View>
              ))}

            <View style={styles.deduction}>
              <Text>Total Deduction:</Text>
              <Text style={styles.bolden}>
                NGN {staff?.total_deduction?.toLocaleString("en-US")}
              </Text>
            </View>
          </View>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.warning}>
            Any alteration to this payslip render it invalid
          </Text>
          <Text style={styles.warning}>{now}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
