import { useGeneralStore } from "../../stores/general";
import { STATS_OPTIONS } from "../../constants";
import StatTable from "./StatTable";

const StatTables = ({
  failed,
  sent,
  awaiting,
}: {
  failed: {}[];
  sent: {}[];
  awaiting: {}[];
}) => {
  const isStatsCurrent = useGeneralStore((state) => state.isStatsCurrent);
  return (
    <>
      {STATS_OPTIONS[0].text === isStatsCurrent && (
        <StatTable title={STATS_OPTIONS[0].text} data={sent} />
      )}
      {STATS_OPTIONS[1].text === isStatsCurrent && (
        <StatTable title={STATS_OPTIONS[1].text} data={failed} />
      )}
      {STATS_OPTIONS[2].text === isStatsCurrent && (
        <StatTable title={STATS_OPTIONS[2].text} data={awaiting} />
      )}
    </>
  );
};

export default StatTables;
