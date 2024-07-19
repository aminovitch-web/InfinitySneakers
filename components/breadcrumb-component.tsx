"use client";

import { Fragment } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  const generateBreadcrumbItems = () => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;

      if (isLast) {
        return (
          <Fragment key={item.label}>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={item.label}>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </BreadcrumbItem>
          </Fragment>
        );
      }
    });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{generateBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
