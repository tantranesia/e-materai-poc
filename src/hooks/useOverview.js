import axios from 'axios';
import { useQuery } from 'react-query';

export default function useOverview() {
  const token = localStorage.getItem('token');
  return useQuery(
    'overview',
    async () => {
      const res = await axios.get(
        'https://wwb6j89602.execute-api.ap-southeast-1.amazonaws.com/dev/buyer-stats?jabatan=3',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data.data;
    },
    {
      onSuccess: (data) => {
        console.log('onsucces', { data });
      },
    }
  );
}
