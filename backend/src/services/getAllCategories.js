import { getConnection } from '../db/context.js'

const getAllCategories = async () => {
  try {
    const connection = await getConnection()
    const query = await connection.request().query(
      `
        SELECT id, name, description, img
        FROM Categories; 
      `
    )
    const newCategories = query.recordset.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      img: row.img ? row.img.toString('base64') : null
    }))
    console.log(newCategories)
    return newCategories
  } catch (error) {
    return error
  }
}

export { getAllCategories }
