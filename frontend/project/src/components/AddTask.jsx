import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'


const AddTask = () => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type="text"
          placeholder="Thêm công việc mới ..."
          className="h-12 font-medium text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        />
        <Button 
        className="px-6 h-12 text-base"
        variant="gradient"
        size='xl'>
        <Plus className='size-5' />
          Thêm 
        </Button>
      </div>
    </Card>
  )
}

export default AddTask;