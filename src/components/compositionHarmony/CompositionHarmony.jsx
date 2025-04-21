import funcs from "../../../utilities/complementaries";

const CompositionHarmony = ({ hsv }) => {
  const contrast = funcs.contrast(hsv);
  console.log(hsv.h);
  console.log({ contrast });
  return <div>CompositionHarmony</div>;
};

export default CompositionHarmony;
