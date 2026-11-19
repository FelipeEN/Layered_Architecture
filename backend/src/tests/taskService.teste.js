import {describe, it,mock} from 'node:test'
import assert from 'node:assert'

import { TaskService } from '../services/taskService'

describe('Deve criar uma tarefa com successo quando os dados forem válidos', ()=>{
    it('deve criar uma tarefa com sucesso quando os dados forem válidos', async()=>{
        const faketask = {id: 1, title:'Estudar Teste Unitários', completed:false}
        const moskRepository ={
            finfByTitle: mock.fn(async()=>null),
            create:mock.fn(async()=> faketask)
        }

        const taskService = new TaskService(moskRepository)

        const result = await taskService.createTask('Estudar Teste Unitários')


    })
})