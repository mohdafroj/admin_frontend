import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import type { SxProps } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { colors } from "@/utils/colors";

export interface CustomBarGarphProps {
  male: number;
  female: number;
  trans: number;
}
export default function CustomBarGarph({
  male,
  female,
  trans,
}: CustomBarGarphProps): React.JSX.Element {
  const series = [{ data: [male,  female, trans,] }];
  return (
    <Card>
      <CardHeader
        title="Gender"
        sx={{ color: colors.light, padding: "20px" }}
      />
      <CardContent>
        <Stack spacing={2}>
            <BarChart
              xAxis={[
                { scaleType: "band", 
                  data: ["Male", "Female", "Transgender"],
                
                colorMap:{
                  type: 'ordinal',
                  colors: [
                    '#15b79f',
                    '#e55352',
                    '#fb9c0c',
                   
                  ],}
                }
            
              ]}
             
              series={series}
              borderRadius={20}
              height={400}
            />
        </Stack>
      </CardContent>
    </Card>
  );
}
