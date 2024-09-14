const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

  const Header = () => {
    return (
    <h1>{course.name}</h1>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} />

      </div>
    )
  }

  const Total = () => {
    const numberOfExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
    return (
      <p>Number of exercises: {numberOfExercises}</p>
    )
  }

  return (
   <div>
    <Header />
    <Content />
    <Total /> 
   </div>
  )
}

export default App