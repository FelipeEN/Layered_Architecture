import {describe, it,mock} from 'node:test'
import assert from 'node:assert'

import { TaskService } from '../services/taskService'
import { error } from 'node:console'

describe('Deve criar uma tarefa com successo quando os dados forem válidos', ()=>{
    it('deve criar uma tarefa com sucesso quando os dados forem válidos', async()=>{
        
        const faketask = {id: 1, title:'Estudar Teste Unitários', completed:false}

        const mockRepository ={
            finfByTitle: mock.fn(async()=>null),
            create:mock.fn(async()=> faketask)
        }

        const taskService = new TaskService(mockRepository)

        const result = await taskService.createTask('Estudar Teste Unitários')

        assert.deepEqual(result,faketask)
        assert.strictEqual(mockRepository.finfByTitle.mock.calls.length,1)
        assert.strictEqual(mockRepository.create.mock.calls.length,1)
    })
    it('Deve lançar o erro 400 se o titulo tiver menos de 3 caracteres', async ()=>{
       
        const mockRepository ={
            findByTitle : mock.fn(),
            create : mock.fn()
        }
        const taskService = new TaskService(mockRepository)

        assert.rejects(
            async ()=>await taskService.createTask('AB'),
            (error)=>{
                assert.strictEqual(error.statusCode, 400)
                return true
            }
        )

        assert.strictEqual(mockRepository.findByTitle.mock.calls.length,0)
    })

    
})