import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link } from "react-router-dom";
import arrow from "../public/arrow.png";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-50 relative">
          <Link to="/" className="absolute top-2 left-2">
            <img src={arrow} alt="Home" className="w-16 h-16" />
          </Link>
        </div>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
