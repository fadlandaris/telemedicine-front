"use client"

import { useMemo } from "react"
import { GridFourIcon, CaretUpIcon, CaretDownIcon, DotsThreeIcon } from "@phosphor-icons/react"
import {
  Table as UITable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export type ScheduleItem = {
  id: number | string
  patient: string
  doctor: string
  time: string
  type: string
  status: string
}

export type ColumnKey = "patient" | "doctor" | "time" | "type" | "status"

const allColumns: { key: ColumnKey; label: string }[] = [
  { key: "patient", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "time", label: "Time" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
]

type Props = {
  title: string
  data: ScheduleItem[]
  search: string
  onSearchChange: (value: string) => void

  page: number
  totalPages: number
  onPageChange: (page: number) => void

  sortBy: ColumnKey | ""
  sortOrder: "asc" | "desc"
  onSortChange: (column: ColumnKey) => void

  visibleColumns: ColumnKey[]
  onVisibleColumnsChange: (columns: ColumnKey[]) => void

  selectedRows: (string | number)[]
  onSelectedRowsChange: (rows: (string | number)[]) => void

  loading?: boolean
}

const Table = ({
  title,
  data,
  search,
  onSearchChange,
  page,
  totalPages,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
  visibleColumns,
  onVisibleColumnsChange,
  selectedRows,
  onSelectedRowsChange,
  loading = false,
}: Props) => {
  const allSelected = useMemo(() => {
    if (!data.length) return false
    return data.every((item) => selectedRows.includes(item.id))
  }, [data, selectedRows])

  const someSelected = useMemo(() => {
    return data.some((item) => selectedRows.includes(item.id))
  }, [data, selectedRows])

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectedRowsChange(data.map((item) => item.id))
    } else {
      onSelectedRowsChange([])
    }
  }

  const toggleRow = (id: string | number, checked: boolean) => {
    if (checked) {
      onSelectedRowsChange([...selectedRows, id])
    } else {
      onSelectedRowsChange(selectedRows.filter((item) => item !== id))
    }
  }

  const toggleColumn = (column: ColumnKey, checked: boolean) => {
    if (checked) {
      if (!visibleColumns.includes(column)) {
        onVisibleColumnsChange([...visibleColumns, column])
      }
    } else {
      onVisibleColumnsChange(visibleColumns.filter((item) => item !== column))
    }
  }

  const renderSortIcon = (column: ColumnKey) => {
    if (sortBy !== column) return null
    return sortOrder === "asc" ? <CaretUpIcon size={14} weight="fill" /> : <CaretDownIcon size={14} weight="fill" />
  }

  const statusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <main className="border border-accent/15 min-h-auto p-4 rounded-2xl bg-white relative">
      <div className="flex items-center gap-x-2">
        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <GridFourIcon size={8} className="text-white" weight="fill" />
        </div>
        <p className="font-medium text-base">{title}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter patients..."
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {allColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={(checked) => toggleColumn(column.key, Boolean(checked))}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 border border-accent/15 rounded-2xl overflow-hidden">
        <UITable>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 px-4">
                <Checkbox
                  checked={allSelected || (someSelected ? "indeterminate" : false)}
                  onCheckedChange={(checked) => toggleSelectAll(Boolean(checked))}
                />
              </TableHead>

              {visibleColumns.includes("patient") && (
                <TableHead className="px-4">
                  <button onClick={() => onSortChange("patient")} className="flex items-center gap-1 font-medium cursor-pointer">
                    Patient
                    {renderSortIcon("patient")}
                  </button>
                </TableHead>
              )}

              {visibleColumns.includes("doctor") && (
                <TableHead className="px-4">
                  <button onClick={() => onSortChange("doctor")} className="flex items-center gap-1 font-medium cursor-pointer">
                    Doctor
                    {renderSortIcon("doctor")}
                  </button>
                </TableHead>
              )}

              {visibleColumns.includes("time") && (
                <TableHead className="px-4">
                  <button onClick={() => onSortChange("time")} className="flex items-center gap-1 font-medium cursor-pointer">
                    Time
                    {renderSortIcon("time")}
                  </button>
                </TableHead>
              )}

              {visibleColumns.includes("type") && (
                <TableHead className="px-4">
                  <button onClick={() => onSortChange("type")} className="flex items-center gap-1 font-medium cursor-pointer">
                    Type
                    {renderSortIcon("type")}
                  </button>
                </TableHead>
              )}

              {visibleColumns.includes("status") && (
                <TableHead className="px-4">
                  <button onClick={() => onSortChange("status")} className="flex items-center gap-1 font-medium cursor-pointer">
                    Status
                    {renderSortIcon("status")}
                  </button>
                </TableHead>
              )}

              <TableHead className="w-12 px-4" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 2} className="px-4 py-10 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={(checked) => toggleRow(item.id, Boolean(checked))}
                    />
                  </TableCell>

                  {visibleColumns.includes("patient") && <TableCell className="px-4 py-3">{item.patient}</TableCell>}
                  {visibleColumns.includes("doctor") && <TableCell className="px-4 py-3">{item.doctor}</TableCell>}
                  {visibleColumns.includes("time") && <TableCell className="px-4 py-3">{item.time}</TableCell>}
                  {visibleColumns.includes("type") && <TableCell className="px-4 py-3">{item.type}</TableCell>}

                  {visibleColumns.includes("status") && (
                    <TableCell className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </TableCell>
                  )}

                  <TableCell className="px-4 py-3">
                    <button className="cursor-pointer">
                      <DotsThreeIcon size={18} weight="bold" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 2} className="px-4 py-10 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-accent">{selectedRows.length} row(s) selected.</p>

        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Table