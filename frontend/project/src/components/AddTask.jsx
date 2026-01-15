import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { priorityOptions } from "@/lib/data";

const AddTask = ({ handleNewTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
          description,
          priority,
          dueDate: dueDate || null,
          tags,
        });
        toast.success("Thêm công việc thành công");

        if (handleNewTaskAdded) {
          handleNewTaskAdded();
        }

        // Reset form
        setNewTaskTitle("");
        setDescription("");
        setPriority("medium");
        setDueDate("");
        setTags([]);
        setTagInput("");
        setOpen(false);
      } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
        toast.error("Lỗi khi thêm công việc.");
      }
    } else {
      toast.error("Vui lòng nhập tiêu đề công việc.");
    }
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

  const quickAdd = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
          priority: "medium",
        });
        toast.success("Thêm công việc thành công");

        if (handleNewTaskAdded) {
          handleNewTaskAdded();
        }
        setNewTaskTitle("");
      } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
        toast.error("Lỗi khi thêm công việc.");
      }
    }
  };

  const handleQuickKeyPress = (event) => {
    if (event.key === "Enter") {
      quickAdd();
    }
  };

  return (
    <Card className="p-4 sm:p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Thêm công việc nhanh..."
          className="h-11 sm:h-12 font-medium text-sm sm:text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleQuickKeyPress}
        />
        <div className="flex gap-2">
          <Button
            className="px-4 sm:px-6 h-11 sm:h-12 text-sm sm:text-base flex-1 sm:flex-none"
            variant="outline"
            onClick={quickAdd}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="size-4 sm:size-5" />
            Thêm nhanh
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="px-4 sm:px-6 h-11 sm:h-12 text-sm sm:text-base flex-1 sm:flex-none"
                variant="gradient"
              >
                <Plus className="size-4 sm:size-5" />
                Chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm công việc mới</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nhập tiêu đề công việc..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
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
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
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
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1"
                        >
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
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <Button
                  variant="gradient"
                  onClick={addTask}
                  disabled={!newTaskTitle.trim()}
                >
                  <Plus className="size-4" />
                  Thêm công việc
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default AddTask;
