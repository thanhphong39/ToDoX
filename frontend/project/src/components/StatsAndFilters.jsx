import { Badge } from "@/components/ui/badge";
import { FilterType } from "@/lib/data";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20 text-xs sm:text-sm"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-info/20 text-xs sm:text-sm"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            className="capitalize w-full sm:w-auto justify-start sm:justify-center"
            onClick={() => setFilter(type)}
            size="sm"
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
