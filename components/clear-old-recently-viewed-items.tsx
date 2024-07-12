"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { clearOldItems } from "@/store/slices/recently-viewed-slice";

const ClearOldRecentlyViewedItems = () => {
  const dispatch = useDispatch();
  const CLEAR_INTERVAL = 24 * 60 * 60 * 1000; // 24 hour

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(clearOldItems(CLEAR_INTERVAL));
    }, CLEAR_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default ClearOldRecentlyViewedItems;
