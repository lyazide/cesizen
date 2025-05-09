"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import {
  Bar,
  Area,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Box } from "@chakra-ui/react";
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
          // Transformation des données : regrouper et cumuler les points par date
          const aggregatedData: Record<string, number> = {};

          data.forEach((item) => {
            const date = item.date_;
            if (aggregatedData[date]) {
              aggregatedData[date] += item.Diagnostic.points;
            } else {
              aggregatedData[date] = item.Diagnostic.points;
            }
          });

          // Conversion en tableau formaté
          const formattedData = Object.entries(aggregatedData).map(
            ([date, points]) => ({
              date,
              points,
            })
          );
          // Trier les données par date (du plus ancien au plus récent)
          formattedData.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          console.log("Données agrégées:", formattedData);
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
    <Box>
      <Box
        backgroundColor={"brand.500"}
        alignItems="center"
        justifyContent="center"
        width="90%"
      >
        {/* Ajout d'un espace entre le header et le graphique */}
        <Box>
          <Chart.Root maxH="sm" chart={chart}>
            <BarChart data={chart.data} margin={{ bottom: 24, left: 24 }}>
              <CartesianGrid
                stroke={chart.color("border.muted")}
                vertical={false}
              />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="date"
                tickFormatter={(value: string) =>
                  new Date(value).toLocaleDateString()
                }
              />
              <YAxis />

              {/* Définition des barres avec couleur dynamique */}
              <Bar dataKey="points">
                {diagnosticData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.points > 300
                        ? "rgba(230, 96, 103, 0.7)" // Rouge semi-transparent
                        : entry.points < 100
                        ? "rgba(141, 172, 157, 0.7)" // Vert semi-transparent
                        : "rgba(246, 244, 231, 0.7)" // Orange semi-transparent
                    }
                  />
                ))}
              </Bar>

              <Tooltip cursor={false} content={<Chart.Tooltip />} />
              <Area
                type="natural"
                dataKey="points"
                fillOpacity={0.2}
                stroke="teal"
              />
            </BarChart>
          </Chart.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
