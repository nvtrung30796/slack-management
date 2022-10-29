import React, {useEffect, useState} from 'react';
import AppLayout from "../components/containers/AppLayout";
import Head from "next/head";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import SummaryCard from "../components/elements/SummaryCard";
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import Typography from "@mui/material/Typography";
import { getListDataAnalyticsByMetric } from '../services/app/analytics.app';
import RoleByUserChart from '../components/containers/analytics/RoleByUserChart';
import MessageByChannelChart from '../components/containers/analytics/MessageByChannelChart';


const HomePage = () => {
  const [metrics, setMetrics] = useState<any>({});

  const loadData = () => {
    getListDataAnalyticsByMetric().then(resp => {
      if(resp.status !== 200) return;
      setMetrics(resp.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="Trang xem thống kê"/>
        <link rel="icon"
              href="https://www.creativefabrica.com/wp-content/uploads/2019/04/Chat-icon-by-ahlangraphic-39.jpg"/>
      </Head>
      <AppLayout>
        <Typography variant={"h2"}>Dashboard Overview</Typography>
        <Box sx={{pt: 2}}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Users" total={metrics.users} icon={<DataSaverOffIcon/>}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Channels" total={metrics.channels} color="info" icon={<DataSaverOffIcon/>}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Messages" total={metrics.totalMessage} color="warning" icon={<DataSaverOffIcon/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Roles" total={metrics.roles} color="warning" icon={<DataSaverOffIcon/>}/>
            </Grid>

             <Grid item xs={12} md={6}>
              <RoleByUserChart
                title="Roles"
                subheader="Role by each user"
                chartData={metrics?.meta?.roleGroupByUser || []}
              />
            </Grid>

    
              <Grid item xs={12} md={6}>
              <MessageByChannelChart
                title="Messages"
                subheader="Message by each channel"
                chartData={metrics?.meta?.messageGroupByChannel || []}
              />
            </Grid> 



          </Grid>
        </Box>
      </AppLayout>
    </React.Fragment>
  );
};

export default HomePage;