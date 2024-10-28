
const Total = ({ parts }) => {
  const [part1, part2, part3] = parts
  
  return (
    <p>Total of {part1.exercises + part2.exercises + part3.exercises} exercises</p>
  )
}

export default Total