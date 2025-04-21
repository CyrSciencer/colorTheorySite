import "./colorTriangle.css";
import triangleCYM from "../../assets/triangleCYM.svg";
import triangleRGB from "../../assets/triangleRGB.svg";
import triangleRYB from "../../assets/triangleRYB.svg";
const ColorTriangles = (hex) => {
  return (
    <div className="color-triangles">
      <div className="color-triangle-container">
        <img src={triangleCYM} alt="triangleCYM" />
        <div className="hex-triangle" style={{ borderBottomColor: hex }}></div>
      </div>
      <div className="color-triangle-container">
        <img src={triangleRGB} alt="triangleRGB" />
      </div>
      <div className="color-triangle-container">
        <img src={triangleRYB} alt="triangleRYB" />
      </div>
    </div>
  );
};

export default ColorTriangles;
