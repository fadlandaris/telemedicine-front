"use client";

import { useState } from "react";
import Image from "next/image";
import PageBreadcrumb from "@/components/dashboard/common/PageBreadCrumb";
import Button from "@/components/dashboard/ui/button/Button";
import Input from "@/components/dashboard/form/input/InputField";
import Badge from "@/components/dashboard/ui/badge/Badge";
import Pagination from "@/components/dashboard/tables/Pagination";
import { CaretDownIcon,DownloadIcon, PlusIcon, TrashIcon, MagnifyingGlassIcon, FadersHorizontalIcon, BookOpenTextIcon } from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/dashboard/ui/table";
import { useCreateRoom } from "@/hooks/useCreateRoom";

const products = [
  {
    id: 1,
    name: "MacBook Pro 13\"",
    category: "Laptop",
    brand: "Apple",
    price: "$2399.00",
    stock: "In Stock",
    createdAt: "Jan 12, 2026",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    category: "Wearables",
    brand: "Apple",
    price: "$879.00",
    stock: "In Stock",
    createdAt: "Jan 10, 2026",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    brand: "Apple",
    price: "$1869.00",
    stock: "Out of Stock",
    createdAt: "Jan 08, 2026",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    category: "Electronics",
    brand: "Apple",
    price: "$1699.00",
    stock: "In Stock",
    createdAt: "Jan 05, 2026",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    brand: "Apple",
    price: "$240.00",
    stock: "In Stock",
    createdAt: "Jan 02, 2026",
    image: "/images/product/product-05.jpg",
  },
  {
    id: 6,
    name: "Dell XPS 15",
    category: "Laptop",
    brand: "Dell",
    price: "$2199.00",
    stock: "Out of Stock",
    createdAt: "Dec 28, 2025",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 7,
    name: "Samsung Galaxy S24",
    category: "Smartphone",
    brand: "Samsung",
    price: "$999.00",
    stock: "In Stock",
    createdAt: "Dec 24, 2025",
    image: "/images/product/product-03.jpg",
  },
];

const CreateRoomButton: React.FC = () => {
  const { handleCreateRoom, isCreating } = useCreateRoom();

  return (
    <Button
      onClick={handleCreateRoom}
      startIcon={<PlusIcon weight="bold" />}
      disabled={isCreating}
    >
      {isCreating ? "Creating..." : "Create Room"}
    </Button>
  );
};


const HistoryPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Consultations History" />

      <div className="overflow-hidden rounded-2xl border  bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Consultations History
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your consultations and keep track.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 ">
            <Button variant="outline" startIcon={<DownloadIcon />}>
              Export
            </Button>
            <CreateRoomButton/>
          </div>
        </div>

        <div className="flex flex-col border-b border-gray-200 gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <MagnifyingGlassIcon/>
            </span>
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <CaretDownIcon />
              </span>
            </div>
            <Button variant="outline" startIcon={<FadersHorizontalIcon/>}>
              Filter
            </Button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1100px] bor">
            <Table>
              <TableHeader className="border-b border-gray-200 dark:border-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Products
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-end text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((product, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-6 py-4 text-start border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            width={48}
                            height={48}
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                          </span>
                          <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                            #{product.id.toString().padStart(4, "0")}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 ">
                      {product.category}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 border-b border-gray-200">
                      {product.brand}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 border-b border-gray-200">
                      {product.price}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 border-b border-gray-200">
                      <Badge
                        size="sm"
                        color={product.stock === "In Stock" ? "success" : "error"}
                      >
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 border-b border-gray-200">
                      {product.createdAt}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-end border-b border-gray-200">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex px-2 py-2 items-center justify-center gap-x-2 rounded-lg border  text-gray-500 transition hover:border-brand-300 hover:text-brand-500 dark:border-gray-800 dark:text-gray-400">
                          <BookOpenTextIcon className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">See More</p>
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border  text-gray-500 transition hover:border-error-300 hover:text-error-500 dark:border-gray-800 dark:text-gray-400">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1 to 7 of 20
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of 3
            </span>
            <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage
