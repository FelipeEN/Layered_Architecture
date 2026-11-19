import { TaskController } from '../controllers/taskController.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { TaskService } from '../services/taskService.js'

import {Router} from 'express'
import pool from '../database/connection.js' 

const router = Router()

const taskRepository = new TaskRepository(pool)
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService) 

router.get('/',(req,res,next)=>taskController.getAll(req,res,next))
router.post('/',(req,res,next)=>taskController.create(req,res,next))
router.patch('/:id/complete',(req,res,next)=>taskController.completed(req,res,next))
router.delete('/:id',(req,res,next)=>taskController.delete(req,res,next))

export default router