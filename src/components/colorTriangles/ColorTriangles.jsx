import "./colorTriangle.css";
import triangleCYM from "../../assets/svg/triangleCYM.svg";
import triangleRGB from "../../assets/svg/triangleRGB.svg";
import triangleRYB from "../../assets/svg/triangleRYB.svg";
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
