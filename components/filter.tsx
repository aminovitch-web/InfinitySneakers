"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import qs from "query-string";
import { Separator } from "@/components/ui/separator";
import { Color, Size } from "@/types";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
  allowMultiple?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
  allowMultiple,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = searchParams.get(valueKey)?.split(",") || [];

  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString());
    let updatedValues;

    if (allowMultiple) {
      const values = new Set(selectedValues);
      if (values.has(name)) {
        values.delete(name);
      } else {
        values.add(name);
      }
      updatedValues = Array.from(values);
    } else {
      updatedValues = [name];
    }

    const query = {
      ...current,
      [valueKey]:
        updatedValues.length > 0 ? updatedValues.join(",") : undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.pathname,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-lg font-semibold">{name}</h3>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {data?.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              onClick={() => onClick(filter.name)}
              variant="outline"
              className={
                selectedValues.includes(filter.name)
                  ? "bg-InfinitySneakers text-white hover:bg-InfinitySneakers-foreground"
                  : "hover:bg-InfinitySneakers-foreground"
              }
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
