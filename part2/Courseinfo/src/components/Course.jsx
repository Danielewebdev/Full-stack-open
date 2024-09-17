const Courses = ({ courses }) => {
    return (
      <>
        {courses.map(course => 
        <Course key={course.id} course={course} />
        )}
      </>
    )
  }
  
  const Course = ({ course }) => {
    const total =
    course.parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
  
    return (
    <>
      <h1>Web development curriculum</h1>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong>Total of exercises: {total}</strong>
    </>
  
    )
  }
  
  const Header = ({ course }) => <h2>{course}</h2>
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  
  const Content = ({ parts }) => (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      
      ))}
      </>
  )

export default Courses