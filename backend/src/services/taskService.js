import taskRepository from "../repositories/taskRepository";

class TaskService {
    async listTasks(){
        return await taskRepository.findAll()
    }

    async createTask(title){
        
        if(title.trim().length < 3 || !title ){
            const error = new Error("O titulo da tarefa deve ter pelo menos 3 caractertes")
            error.statusCode = 400
            throw error
        }

        const existingTask = await taskRepository.findByTitlle(title.trim())
        if(existingTask){
            const error = new Error("Ja existe uma tarefa com este titulo");
            error.statusCode = 409;
            throw error;
        }

        return await taskRepository.create({title: title.trim()})
    }

    async completeTask(id){

        const task = await taskRepository.findById(Number(id))
        
        if(!task){
            const error = new Error("Tarefa não encontrada!")
            error.statusCode = 404
            throw error
        }

        if(task.completed){
         const error = new Error("Essa tarefa ja foi concluida anteriormente.")
         error.statusCode = 400
         throw error   
        }
        
        return await taskRepository.markAsCompleted(Number(id))
    }

    async deleteTask(id){
        const deleted = await taskRepository.delete(Number(id))
        
        if(!deleted){
            const error = new Error("Tarefa não encontrada para exclusão")
            error.statusCode = 404
            return error
        }   
    }
}

export default new TaskService() 