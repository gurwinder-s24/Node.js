import './App.css'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_TODOS = gql`
  query getTodosModClient{
    getTodos {
      title
      user {
        name
        email
        phone
      }
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(GET_TODOS)

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <table>
        {data.getTodos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
            <td>{todo.user.email}</td>
            <td>{todo.user.phone}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default App
