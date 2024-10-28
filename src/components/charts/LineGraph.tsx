import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineGraphTypes {
  title: string;
  height?: number;
  width?: number;
  stroke?: string;
  data: { key: string | number; value: number }[];
}

const LineGraph = ({
  title = "title",
  data = [],
  width = 700,
  height = 300,
  stroke = "#1A4CAF",
}: LineGraphTypes) => {
  return (
    <div className="holder-null">
      <h2 className="font-bold text-2xl capitalize pb-3">{title}</h2>

      <div className="w-full mx-auto">
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
          >
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke={stroke} yAxisId={0} />
            {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default LineGraph;
