import mssql from 'mssql'
import { getConnection } from '../db/context.js'

const addNewCategory = async (name, description, img) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('name', mssql.VarChar, name)
      .input('description', mssql.VarChar, description)
      .input('img', mssql.VarBinary, img)
      .query(
        `
          INSERT INTO Categories(name, description, img)
          VALUES(@name, @description, @img);
        `
      )
    return query.rowsAffected
  } catch (error) {
    return error
  }
}

export { addNewCategory }
