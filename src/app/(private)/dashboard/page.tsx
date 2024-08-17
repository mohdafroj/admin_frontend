"use client";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import { apiCalls } from "@/services/report";
import { CandidateCard } from "@/components/CandidateCard";
import { CustomPieChart } from "@/components/CustomPieChart";
import UserContext from "@/context/UserContext";
import CustomBarGarph from "@/components/CustomBrGraph";

export interface DashboardProps {
  title: string;
  count: number;
}
function Dashboard({}: DashboardProps): React.JSX.Element {
  const [data, setData] = useState();
  const { setTitle } = useContext(UserContext);

  const dashboardData = async () => {
    try {
      const dashboardUrl = "master_data/candidateCount";
      const report = await apiCalls("get", dashboardUrl);
      const data = report.data.data;
      setData(data);
    } catch (err) {
      console.log('this is==========>>>>',err)
    }
  };

  useEffect(() => {
    setTitle("Dashboard");
    dashboardData();
  }, []);
  const totalCount = data?.totalCount;
  const countY = data?.countY;
  const countN = data?.countN;
  const countFemale = data?.totalFemale;
  const countMale = data?.totalMale;
  const countTrans = data?.totalTransgender;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <CandidateCard
            trend="up"
            sx={{ height: "100%", backgroundColor: "#fff" }}
            color="#fb9c0c"
            title="Total Registered Candidates"
            count={data?.totalCount}
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <CandidateCard
            trend="down"
            sx={{ height: "100%", backgroundColor: "#fff" }}
            color="#15b79f"
            title="Candidates Registered with Aadhar"
            count={data?.countY}
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <CandidateCard
            trend="down"
            sx={{ height: "100%", backgroundColor: "#fff" }}
            color=" #e55352"
            title="Candidates Registered without Aadhar"
            count={data?.countN}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <CustomPieChart
            chartSeries={[totalCount, countY, countN]}
            labels={["Total", "Aadhar", "Non-Aadhar"]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <CustomBarGarph
            male={countMale}
            female={countFemale}
            trans={countTrans}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Dashboard;
