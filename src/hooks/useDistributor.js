import axios from 'axios';
import { useQuery } from 'react-query';

export default function useDistributor() {
    const token = localStorage.getItem('token');
  return useQuery(
    'distributor',
    () =>
      axios
        .get(
          'https://wwb6j89602.execute-api.ap-southeast-1.amazonaws.com/dev/buyer?sort=name&filter=all&page=1',
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data.data ),
    {
      onSuccess: (data) => {
        console.log('onsucces distributo', { data });
      },
    }
  );
} 