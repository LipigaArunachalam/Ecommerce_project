import React from 'react';
import { useGetSellerDetailsQuery, useSellerDashboardQuery, ProfileLayout } from '../../../shared';
import { Email, LocationOn, Map, Home } from '@mui/icons-material';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export const SellerProfile = () => {
  const { data, error, isLoading } = useGetSellerDetailsQuery();
  const { data: dashData } = useSellerDashboardQuery();

  const fields = [
    { icon: <Email color="primary" />, label: 'Email Address', value: data?.email },
    { icon: <LocationOn color="primary" />, label: 'City', value: data?.city },
    { icon: <Map color="primary" />, label: 'State', value: data?.state },
    { icon: <Home color="primary" />, label: 'Zip Code', value: data?.zip_code },
  ];

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }
  console.log(dashData);

  return (
    <Box>
      <ProfileLayout data={data} isLoading={isLoading} isError={!!error} fields={fields} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: dashData?.statusCounts?.delivered || 0, label: 'Delivered' },
                { id: 1, value: dashData?.statusCounts?.shipped || 0, label: 'Shipped' },
                { id: 2, value: dashData?.statusCounts?.processing || 0, label: 'Processing' },
                { id: 3, value: dashData?.statusCounts?.cancelled || 0, label: 'Cancelled' },
                { id: 4, value: dashData?.statusCounts?.approved || 0, label: 'approved' },
                { id: 5, value: dashData?.statusCounts?.created || 0, label: 'created' },
                { id: 6, value: dashData?.statusCounts?.unavailable || 0, label: 'unavailable' },
              ],
            },
          ]}
          width={400}
          height={200}
        />

        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Rupees'] }]}
          series={[
            { data: [dashData?.totalRevenue || 0], label: 'Delivered ($)' },
            { data: [dashData?.totalLoss || 0], label: 'Cancelled ($)' },
          ]}
          width={400}
          height={300}
        />
      </Box>
    </Box>
  );
};
