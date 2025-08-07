import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import NotFound from "./pages/NotFound";
import App from "./App";
import { FileProvider } from "./contexts/FileContext";
import Table from "./pages/Table";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-file" element={<FileProvider><UploadFile /></FileProvider>} />
            <Route path="/table" element={<FileProvider><Table /></FileProvider>} />

            <Route path="/app" element={<App />} />
            {/* Protected Route Example */}
            {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* </Route> */}

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
