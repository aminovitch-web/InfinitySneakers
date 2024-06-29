import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/auth";

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  //   const [session, setSession] = useState<Session | null>(null);

  //   const fetchSession = useCallback(async () => {
  //     const session = await getSession();
  //     setSession(session);
  //   }, []);

  //   useEffect(() => {
  //     fetchSession();
  //   }, [fetchSession]);
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider skipDelayDuration={10000}>
          <Toaster />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
