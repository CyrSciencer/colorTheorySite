import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation.js";

const CompositionHarmony = ({ hsv }) => {
  const contrast = InformationTranslationFuncs.contrast(hsv);
  //   console.log(hsv.h);
  //   console.log({ contrast });
  return <div>CompositionHarmony</div>;
};

export default CompositionHarmony;
