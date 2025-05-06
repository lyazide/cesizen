"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface DiagnosticData {
  date_: string;
  Diagnostic: {
    points: number;
  };
}

interface FormattedData {
  date: string;
  points: number;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [diagnosticData, setDiagnosticData] = useState<FormattedData[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/dashboard?userId=${session?.user?.id}`)
        .then((response) => {
          if (!response.ok) {
            console.error(
              `Fetch error: ${response.status} - ${response.statusText}`
            );
            return;
          }
          return response.json();
        })
        .then((data: DiagnosticData[]) => {
          // Transform the data
          const formattedData = data.map((item: DiagnosticData) => ({
            date: item.date_,
            points: item.Diagnostic.points,
          }));
          console.log("Formatted data:", formattedData);
          setDiagnosticData(formattedData);
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [status, session]);

  const chart = useChart({
    data: diagnosticData,
    series: [{ name: "points", color: "teal.solid" }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <AreaChart data={chart.data} margin={{ bottom: 24, left: 24 }}>
        <XAxis
          dataKey="date"
          tickFormatter={(value: string) =>
            new Date(value).toLocaleDateString()
          }
        />
        <YAxis />
        <Tooltip cursor={false} content={<Chart.Tooltip />} />
        <Area type="natural" dataKey="points" fillOpacity={0.2} stroke="teal" />
      </AreaChart>
    </Chart.Root>
  );
};

export default Dashboard;
