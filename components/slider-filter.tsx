"use client";

import { useState, useEffect } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/use-debounce";
import { Separator } from "@/components/ui/separator";

interface SliderFilterProps {
  initialValue: [number, number];
  min: number;
  max: number;
  step: number;
}

const SliderFilter: React.FC<SliderFilterProps> = ({
  initialValue,
  min,
  max,
  step,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const priceRangeParam = searchParams.get("priceRange");
  const initialPriceRange: [number, number] = priceRangeParam
    ? (priceRangeParam.split(",").map(Number) as [number, number])
    : initialValue;

  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(initialPriceRange);

  // Use debounce hook
  const debouncedLocalPriceRange = useDebounce(localPriceRange, 500);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    updateURLParams(debouncedLocalPriceRange);
  }, [debouncedLocalPriceRange]);

  useEffect(() => {
    const priceRangeParam = searchParams.get("priceRange");
    if (priceRangeParam) {
      const newPriceRange: [number, number] = priceRangeParam
        ? (priceRangeParam.split(",").map(Number) as [number, number])
        : initialValue;
      setLocalPriceRange(newPriceRange);
    }
  }, [searchParams]);

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange(value as [number, number]);
  };

  const updateURLParams = (value: [number, number]) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      priceRange: value.join(","),
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
      <h3 className="text-lg font-semibold">Price Range</h3>
      <Separator />
      <Slider
        value={localPriceRange}
        onValueChange={handlePriceChange}
        min={min}
        max={max}
        step={step}
        className="mt-1"
      />
      <div className="flex justify-between text-xs">
        <span>${localPriceRange[0]}</span>
        <span>${localPriceRange[1]}</span>
      </div>
    </div>
  );
};

export default SliderFilter;
