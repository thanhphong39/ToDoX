import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
        res.status(500).json({ message: "Lỗi hệ thống", error });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi tạo công việc:", error);
        res.status(500).json({ message: "Lỗi hệ thống", error });
        
    }
  
};

export const updateTask = async(req, res) => {
  try {
    const {title, status, completedAt} = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {title, status, completedAt},
      {new: true}
    );
    if(!updateTask) {
      return res.status(404).json({message: "Công việc không tồn tại"});
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Lỗi khi cập nhật công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};

export const deleteTask = async(req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if(!deletedTask) {
      return res.status(404).json({message: "Công việc không tồn tại"});
    }
    res.status(200).json({message: "Xóa công việc thành công"});
  } catch (error) {
    console.error("Lỗi khi xóa công việc:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error });
  }
};
