import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today", search = "", sort = "createdAt" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default:
      startDate = null;
  }

  let query = startDate ? { createdAt: { $gte: startDate } } : {};

  // Add search filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  // Determine sort order
  let sortOption = {};
  switch (sort) {
    case "priority":
      sortOption = { priority: 1, createdAt: -1 };
      break;
    case "dueDate":
      sortOption = { dueDate: 1, createdAt: -1 };
      break;
    case "title":
      sortOption = { title: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: sortOption }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]
      ? result[0].activeCount[0].count
      : 0;
    const completedCount = result[0].completedCount[0]
      ? result[0].completedCount[0].count
      : 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;
    const task = new Task({
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      tags: tags || [],
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi tạo công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tags, completedAt } =
      req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (tags !== undefined) updateData.tags = tags;
    if (completedAt !== undefined) updateData.completedAt = completedAt;

    const updateTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!updateTask) {
      return res.status(404).json({ message: "Công việc không tồn tại" });
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Lỗi khi cập nhật công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Công việc không tồn tại" });
    }
    res.status(200).json({ message: "Xóa công việc thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};
