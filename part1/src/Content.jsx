import Part from "./Part";

const Content = ({
  part1,
  part2,
  part3
}) => {
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises}/>
      <Part part={part2.name} exercises={part2.exercises}/>
      <Part part={part3.name} exercises={part3.exercises}/>
    </>
  );
};

export default Content;
