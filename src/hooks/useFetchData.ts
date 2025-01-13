 
import { useQuery } from "react-query";
import { fetchSecureData, fetchUnsecureData } from "../services/api";

export const useFetchData = <T>(endpoint: string, name: Array<any>) => {
    return useQuery({
        queryKey: name,
        queryFn: () => fetchSecureData<T>(endpoint),
    })
};

export const useUnsecureFetchData = <T>(endpoint: string, name: string) => {
    return useQuery({
        queryKey: [name],
        queryFn: () => fetchUnsecureData<T>(endpoint),
    })
};
