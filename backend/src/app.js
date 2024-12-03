import express from 'express'
import multer from 'multer'
import { addNewCategory } from './services/addNewCategory.js'
import { getAllCategories } from './services/getAllCategories.js'
import cors from 'cors'

// multer config
const storage = multer.memoryStorage()
const upload = multer({ storage })

// create server http
const server = express()

// middlewares
server.use(express.json())
server.use(cors())

// routes
server.get('/', (req, res) => {
  return res.json({ message: 'My app categorias' })
})

server.get('/get_categories', async (req, res) => {
  try {
    const categories = await getAllCategories()
    return res.json(categories)
  } catch (error) {
    return res.json(error)
  }
})

server.post('/create_category', upload.single('img'), async (req, res) => {
  const { name, description } = req.body
  const img = req.file.buffer

  try {
    const query = await addNewCategory(name, description, img)
    return res.json({ message: `${query} rows affected` })
  } catch (error) {
    return res.json(error)
  }
})

server.listen(3000, () => {
  console.log('Server on => http://localhost:3000')
})
