import pool from "../database/connection";

class TaskRepository {

    async findAll(){
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    } 

    async findById(id){
        const [rows] = await pool.query('SELECT * FROM tasks WHERE ID = ? ', [id])
        return rows[0] || null; 
    }

    async findByTitlle (title){
        const [rows] = await pool.query(
            'SELECT * FROM tasks LOWER(title) = LOWER = ?',[title]
        )
        return rows[0] || null
    }
    
    async create(taskData){
        const [result] = await pool.query('INSERT INTO tasks (title) VALUES (?)'
          , [taskData.title]
        )
            return this.findById(result.insertId)
    }

    async markAsCompleted(id){
         await pool.query('UPDATE tasks SET completed = TRUE WHERE id = ?',
            [id]
        )
        return this.findById(id)
    }

    async delete (id){
        const [result] = await pool.query('DELETE FROM taks WHERE id = ? ', [id])
        return result.affectedRows > 0 ;   
    }
    
}

export default new TaskRepository();