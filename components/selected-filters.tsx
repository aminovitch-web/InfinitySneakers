"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import qs from "query-string";

const SelectedFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentParams = qs.parse(searchParams.toString());

  const handleClearAll = () => {
    router.push(window.location.pathname);
  };

  const handleClearFilter = (key: string, value?: string) => {
    const current = qs.parseUrl(window.location.href).query;
    const updatedParams = { ...current };

    if (value) {
      if (Array.isArray(updatedParams[key])) {
        updatedParams[key] = (updatedParams[key] as (string | null)[]).filter(
          (v) => v !== value
        );
        if ((updatedParams[key] as (string | null)[]).length === 0)
          delete updatedParams[key];
      } else {
        delete updatedParams[key];
      }
    } else {
      delete updatedParams[key];
    }

    const url = qs.stringifyUrl(
      { url: window.location.pathname, query: updatedParams },
      { skipNull: true }
    );

    router.push(url);
  };

  const getFilterDisplayName = (key: string, value: string) => {
    if (key === "sizeId") return `Size: ${value}`;
    if (key === "colorId") return `Color: ${value}`;
    if (key === "s") return `Search: ${value}`;
    if (key === "priceRange") return `Price Range: ${value}`;

    return value;
  };

  return (
    <div className="flex flex-col gap-y-3 border rounded-md p-2">
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="flex flex-wrap gap-2">
        {Object.keys(currentParams).map((key) => {
          const values = Array.isArray(currentParams[key])
            ? (currentParams[key] as (string | null)[]).filter(
                (v): v is string => v !== null
              )
            : [currentParams[key]].filter((v): v is string => v !== null);

          return values.map((value) => (
            <div
              key={`${key}-${value}`}
              className="flex items-center gap-2 border rounded-md p-1 text-sm"
            >
              <span>{getFilterDisplayName(key, value)}</span>
              <Button
                onClick={() => handleClearFilter(key, value)}
                variant="icon"
                size="sm"
              >
                X
              </Button>
            </div>
          ));
        })}
      </div>
      {Object.keys(currentParams).length > 0 && (
        <Button onClick={handleClearAll} variant="outline">
          Clear All
        </Button>
      )}
    </div>
  );
};

export default SelectedFilters;
