import {useEffect, useState} from "react";

interface Props {
    endpoint: string;
    method: "GET" | "POST" | "DELETE" | "PATCH";
    body?: any;
}

export interface Resp {
    dataApi: any;
    isLoading: boolean;
    isError: boolean;
    errorMsg: string;
}

const URL = "http://localhost:3001";


export const useFetch = (props: Props): Resp => {
    const [dataApi, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${URL}${props.endpoint}`, {
                    method: props.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(props.body),
                });

                if (!res.ok) {
                    throw new Error(`${res.status}, ${res.statusText}`);
                }

                const dataFetched = await res?.json();

                setData(dataFetched);
                setIsLoading(false);
            } catch (error: any) {
                setIsError(true);
                setIsLoading(false);
                setErrorMsg(error.message);
            }
        })();
    }, [props.body, props.endpoint, props.method]);

    return {dataApi, isError, isLoading, errorMsg};
}