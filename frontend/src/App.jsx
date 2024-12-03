import { useState } from "react"
import { useEffect } from "react"

function App() {
  const [data, setData] = useState([])
  useEffect(
    () => {
      fetch('http://localhost:3000/get_categories')
        .then(response => response.json())
        .then(response => setData(response))
    }, 
    []
  )

  console.log(data)
  return (
    <>
      <h1>Registrar categoria</h1>
      <form action="http://localhost:3000/create_category" method="post" encType="multipart/form-data">
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <input type="text" name="description" id="description"/>
        </div>
        <div>
          <label htmlFor="img">Imagen</label>
          <input type="file" name="img" id="img" />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>

      <br /><br />
      <h1>Lista de elementos</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
        </thead>
        <tbody>
          {
            data.map(item => {
              return(
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><img width={75} src={`data:image/jpeg;base64,${item.img}`}/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App