import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';

export default function useUser() {
    const queryClient = useQueryClient();
    const loginUser = useMutation(login => {
        return axios.put('https://wwb6j89602.execute-api.ap-southeast-1.amazonaws.com/dev/user/login', login)
    })


}