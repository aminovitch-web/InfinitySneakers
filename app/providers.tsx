import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/auth";
import { StoreProvider } from "@/store/StoreProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  const session = await auth();

  return (
    <StoreProvider>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider skipDelayDuration={10000}>
            <Toaster position="top-right" />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
