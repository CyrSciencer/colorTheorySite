import "./squareComposition.css";
const BigSquareComposition = ({ main, secondary, tertiary }) => {
  // console.log({ main, secondary, tertiary }); // Corrected and then removed, or just remove if not needed
  return (
    <div className="square-composition">
      <div className="outer" style={{ backgroundColor: main }}></div>
      <div className="middle" style={{ backgroundColor: secondary }}></div>
      <div className="inner" style={{ backgroundColor: tertiary }}></div>
    </div>
  );
};

export default BigSquareComposition;
