"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/settings/account-tab";
import PasswordTab from "@/components/settings/password-tab";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <Tabs defaultValue="account" className="max-w-md mx-auto mt-10">
      <TabsList
        className={`w-full ${
          user?.isOAuth === false ? "grid grid-cols-2" : ""
        }`}
      >
        <TabsTrigger value="account" className="w-full">
          Account
        </TabsTrigger>
        {user?.isOAuth === false && (
          <TabsTrigger value="password" className="w-full">
            Password
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="account">
        <AccountTab />
      </TabsContent>
      {user?.isOAuth === false && (
        <TabsContent value="password">
          <PasswordTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default SettingsPage;
