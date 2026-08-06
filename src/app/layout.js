"use client"

import Providers from "@/providers/Providers"; 
import { AuthProvider } from "@/context/AuthContext";
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html>
      <body>
        <Providers>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            {children}
            </GoogleOAuthProvider>
            </QueryClientProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}