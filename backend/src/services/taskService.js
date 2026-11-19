export class TaskService {
    
    constructor(taskRepository){
        this.taskRepository = taskRepository
    }

    async listTasks(){
        return await this.taskRepository.findAll()
    }

    async createTask(title){
        
        if( !title || title.trim().length < 3  ){
            const error = new Error("O titulo da tarefa deve ter pelo menos 3 caracteres")
            error.statusCode = 400
            throw error
        }

        const existingTask = await this.taskRepository.findByTitle(title.trim())
        if(existingTask){
            const error = new Error("Ja existe uma tarefa com este titulo");
            error.statusCode = 409;
            throw error;
        }

        return await this.taskRepository.create({title: title.trim()})
    }

    async completeTask(id){

        const task = await this.taskRepository.findById(Number(id))
        
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
        
        return await this.taskRepository.markAsCompleted(Number(id))
    }

    async deleteTask(id){
        const deleted = await this.taskRepository.delete(Number(id))
        
        if(!deleted){
            const error = new Error("Tarefa não encontrada para exclusão")
            error.statusCode = 404
            throw error
        }   
    }
}