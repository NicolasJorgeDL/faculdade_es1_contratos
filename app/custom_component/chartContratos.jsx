"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { meses: "Janeiro", desktop: 4},
  { meses: "Fevereiro", desktop: 3 },
  { meses: "Março", desktop: 7 },
  { meses: "Abril", desktop: 3 },
  { meses: "Maio", desktop: 2 },
  { meses: "Junho", desktop: 1},
  { meses: "Julho", desktop: 2},
  { meses: "Agosto", desktop: 2},
  { meses: "Setembro", desktop: 0},
  { meses: "Outubro", desktop: 0},
  { meses: "Novembro", desktop: 0},
  { meses: "Dezembro", desktop: 0},
]

const chartConfig = {
  desktop: {
    label: "Contratos",
    color: "#2563eb",
  }
} 

export default function ChartContratos() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="meses"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
