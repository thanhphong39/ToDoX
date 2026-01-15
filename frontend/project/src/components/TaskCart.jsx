import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { priorityOptions } from "@/lib/data";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
  Clock,
  Tag,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TaskCart = ({ task, index, handleTaskChanged }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(task.tags || []);

  const updateTask = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
        description,
        priority,
        dueDate: dueDate || null,
        tags,
      });
      toast.success("Cập nhật công việc thành công");
      handleTaskChanged();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
      toast.error("Lỗi khi cập nhật công việc.");
    }
  };

  const deletedTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa công việc thành công");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
      toast.error("Lỗi khi xóa công việc.");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success("Công việc đã được đánh dấu là hoàn thành");
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success("Công việc đã được đánh dấu là đang hoạt động");
      }
      handleTaskChanged();
    } catch (error) {}
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const getPriorityColor = (priority) => {
    const option = priorityOptions.find((opt) => opt.value === priority);
    return option ? option.color : "bg-gray-100 text-gray-800";
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status === "active";

  return (
    <>
      <Card
        className={cn(
          "p-3 sm:p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
          task.status === "completed" ? "opacity-70" : "opacity-100",
          isOverdue && "border-l-4 border-l-red-500"
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex shrink-0 size-8 rounded-full transition-all duration-200 mt-0.5",
              task.status === "completed"
                ? "text-success hover:bg-success/80"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
            onClick={toggleTaskCompleteButton}
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>

          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p
                className={cn(
                  "text-sm sm:text-base transition-all duration-200 break-words font-medium",
                  task.status === "completed"
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {task.title}
              </p>

              {task.description && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Priority Badge */}
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] sm:text-xs",
                  getPriorityColor(task.priority)
                )}
              >
                {priorityOptions.find((opt) => opt.value === task.priority)
                  ?.label || "Medium"}
              </Badge>

              {/* Due Date */}
              {task.dueDate && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] sm:text-xs gap-1",
                    isOverdue
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  )}
                >
                  {isOverdue && <AlertCircle className="size-3" />}
                  <Clock className="size-3" />
                  {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                </Badge>
              )}

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <>
                  {task.tags.slice(0, 2).map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-[10px] sm:text-xs gap-1 bg-purple-50 text-purple-700 border-purple-200"
                    >
                      <Tag className="size-3" />
                      {tag}
                    </Badge>
                  ))}
                  {task.tags.length > 2 && (
                    <span className="text-[10px] text-muted-foreground">
                      +{task.tags.length - 2}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <Calendar className="size-3" />
              <span>
                Tạo: {new Date(task.createdAt).toLocaleDateString("vi-VN")}
              </span>
              {task.completedAt && (
                <>
                  <span className="mx-1">•</span>
                  <span>
                    Hoàn thành:{" "}
                    {new Date(task.completedAt).toLocaleDateString("vi-VN")}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:hidden sm:group-hover:flex animate-slide-up">
            <Button
              variant="ghost"
              size="icon"
              className="flex shrink-0 size-7 sm:size-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <SquarePen className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="flex shrink-0 size-7 sm:size-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
              onClick={() => deletedTask(task._id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa công việc</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Nhập tiêu đề công việc..."
                value={updateTaskTitle}
                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                className="bg-slate-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mô tả</label>
              <textarea
                placeholder="Thêm mô tả chi tiết..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[100px] px-3 py-2 text-sm bg-slate-50 border border-border/50 rounded-md focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Độ ưu tiên</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hạn hoàn thành</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 bg-slate-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nhãn</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Thêm nhãn..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    className="pl-10 bg-slate-50"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                >
                  Thêm
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="size-3 cursor-pointer hover:text-destructive"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="gradient"
              onClick={updateTask}
              disabled={!updateTaskTitle.trim()}
            >
              Cập nhật
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCart;
