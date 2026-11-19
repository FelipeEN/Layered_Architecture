export class TaskRepository {
    
  constructor(dbPool){
    this.db = dbPool
  }
    async findAll(){
        const [rows] = await this.db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    } 

    async findById(id){
        const [rows] = await this.db.query('SELECT * FROM tasks WHERE ID = ? ', [id])
        return rows[0] || null; 
    }

    async findByTitle (title){
        const [rows] = await this.db.query(
            'SELECT * FROM tasks WHERE LOWER(title) = LOWER(?)',[title]
        )
        return rows[0] || null
    }
    
    async create(taskData){
        const [result] = await this.db.query('INSERT INTO tasks (title) VALUES (?)'
          , [taskData.title]
        )
            return this.findById(result.insertId)
    }

    async markAsCompleted(id){
         await this.db.query('UPDATE tasks SET completed = TRUE WHERE id = ?',
            [id]
        )
        return this.findById(id)
    }
    
    async delete (id){
        const [result] = await this.db.query('DELETE FROM tasks WHERE id = ? ', [id])
        return result.affectedRows > 0 ;   
    }
    
}