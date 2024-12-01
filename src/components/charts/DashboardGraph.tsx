import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GraphDataTypes } from "../../types";

interface LineGraphTypes {
  height?: number;
  width?: number;

  data: GraphDataTypes[];
}

const DashboardGraph = ({
  data = [],
  width = 1100,
  height = 500,
}: LineGraphTypes) => {
  return (
    <div className="holder-null">
      <h2 className="font-bold text-2xl capitalize pb-3">
        Monthly Grosspay Vs Netpay
      </h2>

      <div className="w-full mx-auto overflow-x-auto">
        {data.length === 0 ? (
          <div>
            <p>No Data To Display</p>
          </div>
        ) : (
          <LineChart
            width={width}
            height={height}
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            // accessibilityLayer
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="gross_pay"
              stroke="green"
              // yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="net_pay"
              stroke="yellow"
              // yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="allowance"
              stroke="black"
              // yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="deduction"
              stroke="red"
              // yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="total_staff"
              stroke="blue"
              // yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="basic_salary"
              stroke="brown"
              // yAxisId={0}
            />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default DashboardGraph;
