import { Badge } from '@/components/ui/badge'
import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

const StatsAndFilters = ({completedTasksCount = 0, activeTasksCount = 0, filter = "all"}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-info/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            className="px-4 py-2 text-sm font-medium cursor-pointer"
            size="sm"
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default StatsAndFilters