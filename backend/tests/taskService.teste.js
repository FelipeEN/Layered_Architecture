import {describe, it,mock} from 'node:test'
import assert from 'node:assert'

import { TaskService } from '../src/services/taskService.js'


describe('TaskService - Testes Unitários', ()=>{
    it('deve criar uma tarefa com sucesso quando os dados forem válidos', async()=>{
        
        const faketask = {id: 1, title:'Estudar Teste Unitários', completed:false}

        const mockRepository ={
            findByTitle: mock.fn(async()=>null),
            create:mock.fn(async()=> faketask)
        }

        const taskService = new TaskService(mockRepository)

        const result = await taskService.createTask('Estudar Teste Unitários')

        assert.deepStrictEqual(result,faketask)
        assert.strictEqual(mockRepository.findByTitle.mock.calls.length,1)
        assert.strictEqual(mockRepository.create.mock.calls.length,1)
    })
    it('Deve lançar o erro 400 se o titulo tiver menos de 3 caracteres', async ()=>{
       
        const mockRepository ={
            findByTitle : mock.fn(),
            create : mock.fn()
        }
        const taskService = new TaskService(mockRepository)

       await assert.rejects(
            async ()=>await taskService.createTask('AB'),
            (error)=>{
                assert.strictEqual(error.statusCode, 400)
                return true
            }
        )

        assert.strictEqual(mockRepository.findByTitle.mock.calls.length,0)
    })

    it('deve lançar o erro 409 se já existir uma tarefa com o mesmo título', async()=>{
        
        const mockRepository ={
            findByTitle : mock.fn(async ()=>({id: 1, title: 'Tarefa Repetida'})),
            create: mock.fn()
        }

        const taskService = new TaskService(mockRepository)
        
        await assert.rejects(
            async ()=> await taskService.createTask('Tarefa Repetida'),
            (error) =>{
                assert.strictEqual(error.statusCode, 409)
                return true
            }
        )
        assert.strictEqual(mockRepository.create.mock.calls.length,0)
    })

    it('deve lançar erro 400 ao tentar concluir uma tarefa que já está concluída', async()=>{
        const mockRepository ={
            findById: mock.fn(async ()=> ({id:1, title: 'Tarefa Feita',completed:1})),
            markAsCompleted : mock.fn()
        }
        const taskService = new TaskService(mockRepository)

       await assert.rejects(
            async()=> await taskService.completeTask(1),
            (error)=>{
                assert.strictEqual(error.statusCode,400)
                return true
            } 
        )
        assert.deepStrictEqual(mockRepository.markAsCompleted.mock.calls.length,0)
    })

})