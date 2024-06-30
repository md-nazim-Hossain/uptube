import { Column } from "@tanstack/react-table";
import { PiCaretDownLight } from "react-icons/pi";
import { VscArrowDown, VscArrowUp } from "react-icons/vsc";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isShown?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isShown = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() || !isShown) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent hover:bg-transparent rounded-none"
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <VscArrowDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <VscArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <PiCaretDownLight className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
