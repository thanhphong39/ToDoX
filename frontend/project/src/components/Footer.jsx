import React from 'react'

const Footer = ({
  completedTasksCount = 0,
  activeTasksCount = 0
}) => {
  return (
   <>
    {completedTasksCount  + activeTasksCount > 0 && (
      <div className='mt-6 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground'>
        <p>
          {
            activeTasksCount > 0 && (
              <>
                Tuyệt vời! Bạn da hoan thành <span className='font-medium text-foreground'>{completedTasksCount}</span> công việc.
                {
                  activeTasksCount > 0 && ` Còn lại ${activeTasksCount} công việc nữa thôi. Cố lên !.`
                }
              </>
            )
          }

          {completedTasksCount === 0 && activeTasksCount > 0 && (
            <>
              Bạn có <span className='font-medium text-foreground'>{activeTasksCount}</span> công việc đang chờ hoàn thành. Cố lên nhé!
            </>
          )}
        </p>
      </div>
    )}
   </>
  )
};

export default Footer