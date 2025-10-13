import { useEffect } from "react";

const CustomAccountRedirect = () => {
    useEffect(() => {
        window.location.replace("http://localhost:4200");
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2>Redirecting to your account page...</h2>
        </div>
    );
};

export default CustomAccountRedirect;
