import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Check if Stripe public key is available
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY. Payment functionality will not work correctly.');
}

createRoot(document.getElementById("root")!).render(<App />);
