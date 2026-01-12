import TaskCart from '@/components/TaskCart';
import TaskEmptyState from '@/components/TaskEmptyState';
import React from 'react'

const TaskList = ({ filteredTasks,filter,handleTaskChanged }) => {


  if (filteredTasks.length === 0 || !filteredTasks) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCart key={task._id ?? index} task={task} index={index} handleTaskChanged={handleTaskChanged}/>
      ))}
    </div>
  );
};

export default TaskList