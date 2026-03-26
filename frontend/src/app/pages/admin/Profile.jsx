import { Email, LocationOn, Map, Home } from '@mui/icons-material';
import { ProfileLayout, useGetAdminQuery } from '../../../shared';

export const AdminProfile = () => {
  const { data, error, isLoading } = useGetAdminQuery();

  const fields = [
    { icon: <Email color="primary" />, label: 'Email Address', value: data?.email },
    { icon: <LocationOn color="primary" />, label: 'City', value: data?.city },
    { icon: <Map color="primary" />, label: 'State', value: data?.state },
    { icon: <Home color="primary" />, label: 'Zip Code', value: data?.zip_code },
  ];

  return <ProfileLayout data={data} isLoading={isLoading} isError={!!error} fields={fields} />;
};
