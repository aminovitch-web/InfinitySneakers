import React from "react";
import Orders from "../_components/orders";
import BreadcrumbComponent from "@/components/breadcrumb-component";

const OrdersPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Orders" },
  ];

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbs} />
      <Orders />
    </div>
  );
};

export default OrdersPage;
