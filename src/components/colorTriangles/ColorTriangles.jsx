import "./colorTriangle.css";
import triangleCYM from "../../assets/triangleCYM.svg";
import triangleRGB from "../../assets/triangleRGB.svg";
import triangleRYB from "../../assets/triangleRYB.svg";
import ColorTriangle from "./ColorTriangle";
const ColorTriangles = ({ hex }) => {
  return (
    <div className="color-triangles">
      <ColorTriangle hex={hex} triangle={triangleCYM} />
      <div className="color-bottom-triangles-container">
        <ColorTriangle hex={hex} triangle={triangleRGB} />
        <ColorTriangle hex={hex} triangle={triangleRYB} />
      </div>
    </div>
  );
};

export default ColorTriangles;
