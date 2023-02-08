import "./KnotmanDrawing.css";

const HEAD = <div className="head"></div>;
const BODY = <div className="body"></div>;
const RIGHT_ARM = <div className="right_arm"></div>;
const LEFT_ARM = <div className="left_arm"></div>;
const RIGHT_LEG = <div className="right_leg"></div>;
const LEFT_LEG = <div className="left_leg"></div>;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type knotmanDrawingProps = {
  numberOfGuesses: number;
};

function KnotmanDrawing({ numberOfGuesses }: knotmanDrawingProps) {
  return (
    <div className="draw">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="wood3"></div>
      <div className="knot"></div>
      <div className="wood2"></div>
      <div className="wood1"></div>
    </div>
  );
}

export default KnotmanDrawing;
