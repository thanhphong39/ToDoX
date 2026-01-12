import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, Square, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


const TaskCart = ({ task, index, handleTaskChanged }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const updateTask = async () => {
        try {
            setIsEditing(false);
            await api.put(`/tasks/${task._id}`, {
                title: updateTaskTitle,
            });
            toast.success("Cập nhật công việc thành công");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi cập nhật công việc:", error);
            toast.error("Lỗi khi cập nhật công việc.");
        }
    }

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

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        updateTask();
      }
    };

    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`,{
                    status: "completed",
                    completedAt: new Date().toISOString(),
                });
                toast.success("Công việc đã được đánh dấu là hoàn thành");     
            } else {
                await api.put(`/tasks/${task._id}`,{
                    status: "active",
                    completedAt: null,
                });
                toast.success("Công việc đã được đánh dấu là đang hoạt động");               
                };
            handleTaskChanged();                      
        } catch (error) {
            
        }
    }

    return (
        <Card
            className={cn(
                "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === "completed" ? "opacity-70" : "opacity-100"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex shrink-0 size-8 rounded-full transition-all duration-200",
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

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder="Chỉnh sửa công việc..."
                            defaultValue={task.title}
                            className="flex-1 h-12 text-base border-border/50 foucus:border-primary focus:ring-primary/20"
                            type="text"
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            value={updateTaskTitle}
                            onKeyPress={handleKeyPress}   
                            onBlur={() => {
                            setIsEditing(false);
                            setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    ) : (
                        <p
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === "completed"
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground"
                            )}
                        >
                            {task.title}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex shrink-0 size-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                        onClick={() => setIsEditing(true)}
                        setUpdateTaskTitle={task.title || "" }
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex shrink-0 size-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                        onClick={() => deletedTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default TaskCart