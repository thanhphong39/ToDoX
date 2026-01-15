import React from "react";
import { CheckCircle2, TrendingUp, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  const totalTasks = completedTasksCount + activeTasksCount;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  // Smart motivational messages based on progress
  const getMotivation = () => {
    if (totalTasks === 0)
      return {
        msg: "Bắt đầu ngày mới! Thêm công việc đầu tiên nào! 🚀",
        icon: Zap,
        color: "text-blue-500",
      };
    if (completionRate === 100)
      return {
        msg: "🎉 Xuất sắc! Bạn đã hoàn thành tất cả!",
        icon: Award,
        color: "text-yellow-500",
      };
    if (completionRate >= 75)
      return {
        msg: "Tuyệt vời! Sắp hoàn thành rồi, cố gắng thêm chút nữa! 💪",
        icon: TrendingUp,
        color: "text-green-500",
      };
    if (completionRate >= 50)
      return {
        msg: "Làm tốt lắm! Đã được một nửa rồi đấy! 👏",
        icon: CheckCircle2,
        color: "text-blue-500",
      };
    if (completionRate >= 25)
      return {
        msg: "Khởi đầu tốt! Tiếp tục phát huy nhé! ⭐",
        icon: CheckCircle2,
        color: "text-purple-500",
      };
    return {
      msg: "Bắt đầu với một công việc nhỏ thôi! 💡",
      icon: Zap,
      color: "text-orange-500",
    };
  };

  const motivation = getMotivation();
  const Icon = motivation.icon;

  return (
    <footer className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50 space-y-4">
      {totalTasks > 0 && (
        <>
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-foreground">
                Tiến độ hôm nay
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm font-bold",
                  completionRate === 100 ? "text-green-600" : "text-primary"
                )}
              >
                {completionRate}%
              </span>
            </div>
            <div className="relative h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
                  completionRate === 100
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : completionRate >= 75
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : completionRate >= 50
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-orange-500 to-red-500"
                )}
                style={{ width: `${completionRate}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 sm:size-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle2 className="size-3.5 sm:size-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-muted-foreground">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {completedTasksCount}
                </span>{" "}
                hoàn thành
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 sm:size-8 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <div className="size-2 sm:size-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              </div>
              <span className="text-muted-foreground">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {activeTasksCount}
                </span>{" "}
                đang làm
              </span>
            </div>
          </div>
        </>
      )}

      {/* Motivational Message */}
      <div className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-lg">
        <Icon
          className={cn("size-4 sm:size-5 shrink-0 mt-0.5", motivation.color)}
        />
        <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
          {motivation.msg}
        </p>
      </div>

      {/* Branding */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 pt-3 border-t border-border/30">
        <p className="text-[10px] sm:text-xs text-muted-foreground/70">
          Made with ❤️ by{" "}
          <span className="font-semibold text-primary">TodoX</span>
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} • Thanh Phong
        </p>
      </div>
    </footer>
  );
};

export default Footer;
