import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
    useEffect(() => {
        axios.post(" http://13.51.242.2:8000/api/logout/", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }).then((res) => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/";
        }).catch((err) => {
            console.error("Error logging out:", err);
        });
    }, []);

    return null; // or a loading spinner, message, etc.
};
