import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";
import React from "react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-6 sm:p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <Circle className="size-10 sm:size-12 mx-auto text-muted-foreground" />
      <div>
        <h3 className="mt-3 sm:mt-4 mb-2 text-sm sm:text-base text-foreground font-medium">
          {filter === "active"
            ? "Không có công việc đang làm"
            : filter === "completed"
            ? "Không có công việc hoàn thành"
            : "Không có công việc nào"}
        </h3>

        <p className="text-sm text-muted-foreground">
          {filter === "all"
            ? "Thêm công việc mới để bắt đầu quản lý công việc của bạn."
            : `Chuyển sang "Tất cả" để thấy những nhiệm vụ ${
                filter === "active" ? "đang làm" : "đã hoàn thành"
              }.`}
        </p>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
