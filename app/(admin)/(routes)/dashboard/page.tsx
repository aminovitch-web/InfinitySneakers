import { LuCircleDollarSign } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { IoBagOutline } from "react-icons/io5";
import { RiTShirt2Line } from "react-icons/ri";
import { CgPlayButtonO } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CgSize } from "react-icons/cg";
import { SiBillboard } from "react-icons/si";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalProducts,
  getTotalSales,
  getTotalCategories,
  getTotalUsers,
} from "@/lib/actions";
import SalesChart from "./_components/sales-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalProducts = await getTotalProducts().then(
    (data) => data.totalProducts
  );
  const totalCategories = await getTotalCategories().then(
    (data) => data.totalCategories
  );
  const totalUsers = await getTotalUsers().then((data) => data.totalUsers);

  const graphData = await getSalesPerMonth();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={"Dashboard"}
            description="Manage general information for your store"
          />
        </div>
        <Separator />

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8">
          <Card className="mt-6">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Total Revenue</CardTitle>
              <LuCircleDollarSign className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">$ {totalRevenue}</p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Total Orders</CardTitle>
              <IoBagOutline className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">{totalOrders}</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Sales Chart ($)</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart data={graphData} />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8">
          <Card className="mt-6">
            <CardHeader className="flex flex-row justify-between gap-3 items-center">
              <CardTitle>Total Products</CardTitle>
              <RiTShirt2Line className="max-sm:hidden" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <p className="font-bold">{totalProducts}</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader className="flex flex-row justify-between gap-3 items-center">
              <CardTitle>Total Categories</CardTitle>
              <BiCategory className="max-sm:hidden" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <p className="font-bold">{totalCategories}</p>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader className="flex flex-row justify-between gap-3 items-center">
              <CardTitle>Total Users</CardTitle>
              <CiUser className="max-sm:hidden" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <p className="font-bold">{totalUsers}</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 max-xl:grid-cols-1">
          <Card className="mt-10">
            <CardHeader className="flex flex-row justify-between gap-3 items-center">
              <CardTitle>Shortcut Buttons</CardTitle>
              <CgPlayButtonO className="max-sm:hidden" />
            </CardHeader>
            <CardContent className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
              <Button variant="outline" className="p-16" asChild>
                <Link href="/billboards/new">
                  <span className="flex flex-col justify-center items-center gap-2">
                    <SiBillboard className="w-10 h-10" />
                    Add New Billboard
                  </span>
                </Link>
              </Button>
              <Button variant="outline" className="p-16" asChild>
                <Link href="/categories/new">
                  <span className="flex flex-col justify-center items-center gap-2">
                    <BiCategory className="w-10 h-10" />
                    Add New Category
                  </span>
                </Link>
              </Button>
              <Button variant="outline" className="p-16" asChild>
                <Link href="/colors/new">
                  <span className="flex flex-col justify-center items-center gap-2">
                    <IoColorPaletteOutline className="w-10 h-10" />
                    Add New Color
                  </span>
                </Link>
              </Button>
              <Button variant="outline" className="p-16" asChild>
                <Link href="/sizes/new">
                  <span className="flex flex-col justify-center items-center gap-2">
                    <CgSize className="w-10 h-10" />
                    Add New Size
                  </span>
                </Link>
              </Button>
              <Button variant="outline" className="p-16" asChild>
                <Link href="/products/new">
                  <span className="flex flex-col justify-center items-center gap-2">
                    <RiTShirt2Line className="w-10 h-10" />
                    Add New Product
                  </span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
