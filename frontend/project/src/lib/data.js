export const FilterType = {
  all: "tất cả",
  completed: "hoàn thành",
  active: "đang làm",
};

export const options = [
  { value: "all", label: "Tất cả" },
  { value: "today", label: "Hôm nay" },
  { value: "week", label: "Tuần này" },
  { value: "month", label: "Tháng này" },
];

export const priorityOptions = [
  {
    value: "low",
    label: "Thấp",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    value: "medium",
    label: "Trung bình",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    value: "high",
    label: "Cao",
    color: "bg-red-100 text-red-800 border-red-300",
  },
];

export const sortOptions = [
  { value: "createdAt", label: "Ngày tạo" },
  { value: "priority", label: "Ưu tiên" },
  { value: "dueDate", label: "Hạn hoàn thành" },
  { value: "title", label: "Tên A-Z" },
];

export const visibleTaskLimit = 4;
