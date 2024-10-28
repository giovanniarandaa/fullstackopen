
const Total = ({ parts }) => {
  const total = parts.reduce((acc, current) => acc + current.exercises, 0)
  return (
    <p>Total of {total} exercises</p>
  )
}

export default Total