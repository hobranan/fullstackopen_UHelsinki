
const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  function getSum(total, num) {
    return total + num.exercises;
  }
  const output_sum = parts.reduce(getSum, 0);
  return (
    <div>
      <p> <b>total of exercises {output_sum}</b></p>
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

export default Course;