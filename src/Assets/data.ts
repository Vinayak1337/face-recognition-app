import { useEffect, useState } from "react";

export const baseUrl = 'https://image-recognition-server.herokuapp.com';
// export const baseUrl = 'http://localhost:8080';

export const globalOptions: FetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

export const setToLocal = (key: string, value: any) => {
    try {
        const string = value != null ? JSON.stringify(value) : null;
        if (!string) return localStorage.removeItem(key);

        localStorage.setItem(key, string);
    } catch (error) {
        throw error;
    }
}

export const getFromLocal = (key: string, initialValue: any) => {
    return localStorage.getItem(key) || initialValue;
}

export const setToSession = (key: string, value: any) => {
    try {
        const string = (value != null) ? JSON.stringify(value) : null;
        if (!string) return sessionStorage.removeItem(key);

        sessionStorage.setItem(key, string);
    } catch (error) {
        throw error;
    }
}

export const getFromSession = (key: string, initialValue: any) => {
    return localStorage.getItem(key) || initialValue;
}

export const FLAGS = {
    HAS_LOCAL_USER: false,
}

export function useSession<A> (key: string, initialValue: A) {
    let [value, setValue] = useState(() => {
        return getFromSession(key, initialValue);
    });

    useEffect(() => setToSession(key, value), [key, value]);

    return [value, setValue];
}

export function useLocalStorage<A>(key: string, initialValue: A) {
    let [value, setValue] = useState(() => {
        return getFromLocal(key, initialValue);
    });

    useEffect(() => setToLocal(key, value), [key, value]);

    return [value, setValue];
}

export const useLogger = (...args: any) => {
    useEffect(() => console.log(args.join(',')), [args]);
}