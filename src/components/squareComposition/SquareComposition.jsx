import "./squareComposition.css";
const SquareComposition = ({ innerColor, outerColor }) => {
  //   console.log({ innerColor, outerColor });
  return (
    <div className="square-composition">
      <div
        className="outer-square"
        style={{ backgroundColor: outerColor, borderColor: innerColor }}
      ></div>
      <div
        className="inner-square"
        style={{ backgroundColor: innerColor }}
      ></div>
    </div>
  );
};

export default SquareComposition;
