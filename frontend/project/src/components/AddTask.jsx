import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {


  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {

    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success("Thêm công việc thành công");


        if (handleNewTaskAdded) {
          handleNewTaskAdded();
        }
      } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
        toast.error("Lỗi khi thêm công việc.");
      }

      setNewTaskTitle("");
    } else {
      toast.error("Vui lòng nhập tiêu đề công việc.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Thêm công việc mới ..."
          className="h-12 font-medium text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <Button
          className="px-6 h-12 text-base"
          variant="gradient"
          size="xl"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
