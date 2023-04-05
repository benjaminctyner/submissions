const Header = ({ courses }) => <h1>{courses}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <p>
      <strong>
        Total of {parts.reduce((sum, coursnum) => sum + coursnum.exercises, 0)}{' '}
        exercises
      </strong>
    </p>
  </>
);

const Courses = ({ courses }) => (
  <>
    <h1>Web development curriculum</h1>
    {courses.map((course) => (
      <>
        <Header key={course.name} courses={course.name} />
        <Content key={course.parts.id} parts={course.parts} />
      </>
    ))}
  </>
);

export default Courses;
