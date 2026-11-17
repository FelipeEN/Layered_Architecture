import taskService from "../services/taskService";

class TaskController{
    async getAll (req,res,next){
        try{
            const tasks = await taskService.listTasks()
            return res.status(200).json(tasks)
        }catch(error){
            next(error)
        }
    }

    async create (req,res,next){
        try{
            const {title} =  req.body
            const newTasks = await taskService.createTask(title)
            return res.status(201).json(newTasks)
        }catch(error){
            next(error)
        }
    }


    async completed (req,res,next){
        try{
            const {id} = req.params
            const completeTasks = await taskService.completeTask(id)
            return res.status(200).json(completeTasks)
        }catch(error){
            next(error)
        }
    }


    async delete (id){
        try{
            const {id}= req.params
            const deleteTasks = await taskService.deleteTask(id)
            return req.status(204).json(deleteTasks)
        }catch(error){
            next(error)
        }
    }
}

export default new TaskController()