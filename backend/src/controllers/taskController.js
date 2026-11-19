export class TaskController{
    constructor(taskService){
        this.taskService = taskService
    }
    
    async getAll (req,res,next){
        try{
            const tasks = await this.taskService.listTasks()
            return res.status(200).json(tasks)
        }catch(error){
            next(error)
        }
    }

    async create (req,res,next){
        try{
            const {title} =  req.body
            const newTasks = await this.taskService.createTask(title)
            return res.status(201).json(newTasks)
        }catch(error){
            next(error)
        }
    }


    async completed (req,res,next){
        try{
            const {id} = req.params
            const completeTasks = await this.taskService.completeTask(id)
            return res.status(200).json(completeTasks)
        }catch(error){
            next(error)
        }
    }


    async delete (req,res,next){
        try{
            const {id}= req.params
            await this.taskService.deleteTask(id)
            return res.status(204).send()
        }catch(error){
            next(error)
        }
    }
}