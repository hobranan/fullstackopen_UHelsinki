const Header = ({ course }) => <h1>{course}</h1>;

// * did reduce this way
// reference: https://www.w3schools.com/jsref/jsref_reduce.asp
const Total = ({ parts }) => {
  function getSum(total, num) {
    return total + num.exercises;
  }
  const output_sum = parts.reduce(getSum, 0);
  return (
    <div>
      <p>Number of exercises {output_sum}</p>
    </div>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => (
        <Part key={item.id} part={item} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
  <Course course={course} />
  );
};

export default App;