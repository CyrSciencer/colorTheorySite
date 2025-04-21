import "./colorTriangle.css";

const ColorTriangle = ({ hex, triangle }) => {
  return (
    <div className="color-triangle-container">
      <img src={triangle} alt={`${triangle}`} />
      <div className="hex-triangle" style={{ borderBottomColor: hex }}></div>
    </div>
  );
};

export default ColorTriangle;
