import React from "react";
import {useAuth} from "../context/authContext";

function ProtectedRoute({children}) {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view this content.</div>;
    }

    return children;
}

export default ProtectedRoute;