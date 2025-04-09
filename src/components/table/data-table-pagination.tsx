import { Table } from "@tanstack/react-table";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { IPaginationMeta } from "@/types";
import { usePaginateStore } from "@/zustand/usePaginateStore";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  meta?: IPaginationMeta;
}

export function DataTablePagination<TData>({
  table,
  meta,
}: DataTablePaginationProps<TData>) {
  const { paginate, setPaginate } = usePaginateStore();
  return (
    <div className="w-full flex items-center justify-between studio-container">
      <div className="flex-1 hidden sm:block text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm hidden xs:block font-medium">Rows per page</p>
          <Select
            value={`${meta?.limit}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setPaginate({
                ...paginate,
                limit: Number(value),
                page: (meta?.total || 1) < Number(value) ? 1 : paginate.page,
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={meta?.limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta?.currentId || table.getState().pagination.pageIndex + 1} of{" "}
          {meta?.totalPage || table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex border-primary/20 hover:bg-primary/40"
            onClick={() => {
              table.setPageIndex(0);
              setPaginate({
                ...paginate,
                page: 1,
              });
            }}
            disabled={!meta?.previousId}
          >
            <span className="sr-only">Go to first page</span>
            <MdOutlineKeyboardDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/20 hover:bg-primary/40"
            onClick={() => {
              table.previousPage();
              setPaginate({
                ...paginate,
                page: meta?.previousId || 1,
              });
            }}
            disabled={!meta?.previousId}
          >
            <span className="sr-only">Go to previous page</span>
            <CgChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/20 hover:bg-primary/40"
            onClick={() => {
              table.nextPage();
              setPaginate({
                ...paginate,
                page: meta?.nextId || 1,
              });
            }}
            disabled={!meta?.nextId}
          >
            <span className="sr-only">Go to next page</span>
            <CgChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex border-primary/20 hover:bg-primary/40"
            onClick={() => {
              table.setPageIndex(meta?.totalPage as number);
              setPaginate({
                ...paginate,
                page: meta?.totalPage as number,
              });
            }}
            disabled={!meta?.nextId}
          >
            <span className="sr-only">Go to last page</span>
            <MdOutlineKeyboardDoubleArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
