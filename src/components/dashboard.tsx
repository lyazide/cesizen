"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [diagnosticData, setDiagnosticData] = useState([]);

  console.log("Dashboard component is rendering...");

  console.log("Session status:", status); // Should log 'loading' or 'authenticated'
  console.log("Session data:", session); // Should log session object

  useEffect(() => {
    console.log("UseEffect triggered by status change:", status);

    if (status === "authenticated") {
      console.log("Session object:", session);

      fetch(`/api/dashboard?userId=${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched diagnostics:", data);
          setDiagnosticData(data);
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
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip cursor={false} content={<Chart.Tooltip />} />
        <Area type="natural" dataKey="points" fillOpacity={0.2} stroke="teal" />
      </AreaChart>
    </Chart.Root>
  );
};

export default Dashboard;
