const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Total = ({ sumOfExercises }) => {
  return <p>Number of exercises {sumOfExercises}</p>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total
        sumOfExercises={course.parts.reduce(
          (total, curr) => total + curr.exercises,
          0
        )}
      />
    </div>
  );
};
