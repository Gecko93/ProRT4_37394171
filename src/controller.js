import {pool} from './database.js';

class LibroController{
	
	async getAll(req,res) {
	try {
		const result = await pool.query('SELECT * FROM libros');
		res.json(result);
	} catch (error) {
		console.error('Error al obtener todos los libros:', error);
		res.status(500).json({ message: 'Error al obtener todos los libros' });
	}
	}

	async getOne(req, res) {
		const { id } = req.params;
		try {
			const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
			if (result.length === 0) {
				return res.status(404).json({ message: 'Libro no encontrado'});
			}
			res.json(result[0]);
		} catch (error) {
			console.error('Error al obtener el libro:', error);
			res.status(500).json({ message: 'Error al obtener el libro'});
		}
	}


	async add(req, res){
		try {
		const libro = req.body;
		const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
		[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
		res.json({"Id insertado": result.insertId});
	} catch (error) {
		console.error('Error al agregar el libro:', error);
		res.status(500).json({ message: 'Error al agregar el libro'});
	}
	}

	async delete(req, res){
		try {
		const libro = req.body;
		const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=?`,[libro.ISBN]);
		res.json({"Registros eliminados": result.affectedRows});
		} catch (error) {
			console.error('Error al eliminar el libro:', error);
			res.status(500).json({ message: 'Error al eliminar el libro' });
		}
	}

	async update(req, res){
		try {
		const libro = req.body;
		const [result] = await pool.query(`UPDATE libros SET nombre= ?, autor= ?, categoria= ?, anio_publicacion= ?, ISBN= ? WHERE id= ?`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]);
		res.json({"Registros actualizados": result.changedRows});
		} catch (error) {
			console.error('Error al actualizar el libro:', error);
			res.status(500).json({ message: 'Error al actualizar el libro' });
		}
	}

}

export const libro = new LibroController();