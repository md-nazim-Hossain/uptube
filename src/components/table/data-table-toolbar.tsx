"use client";

import { RxCross2 } from "react-icons/rx";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeHolder?: string;
}

export function DataTableToolbar<TData>({
  table,
  placeHolder,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="w-full flex items-center justify-between studio-container">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={placeHolder ?? "Filter videos..."}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 max-w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetGlobalFilter()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
