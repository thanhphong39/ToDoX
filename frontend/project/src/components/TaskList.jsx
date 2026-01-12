import TaskCart from '@/components/TaskCart';
import TaskEmptyState from '@/components/TaskEmptyState';
import React from 'react'

const TaskList = () => {
  let filter = "all";
  const filteredTasks = [
    { _id: 1, 
    title: "Task 1",
    status: "active", 
    completedAt: null,
    createdAt: new Date(),
    },
    { _id: 2, 
    title: "Task 2",
    status: "completed",
    completedAt: new Date(),
    createdAt: new Date(),
    },
    
  ];

  if (filteredTasks.length === 0 || !filteredTasks) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className='space-y-3'>
      {filteredTasks.map((task,index) => (
        <TaskCart 
            key={task._id ?? index} 
            task={task}
            index={index}
            />
      ))}
    </div>
  )
}

export default TaskList