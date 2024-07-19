"use client";

import { ApiAlert } from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const origin = useOrigin();

  const baseUrl = `${origin}/api`;

  return (
    <>
      {/* API ALERTS*/}
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      {entityName !== "users" &&
        entityName !== "stocks" &&
        entityName !== "reviews" && (
          <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
          />
        )}

      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      {entityName !== "stocks" && (
        <ApiAlert
          title="DELETE"
          variant="admin"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
      )}
    </>
  );
};
