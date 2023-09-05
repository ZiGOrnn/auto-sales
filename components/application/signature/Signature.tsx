import SignatureCanvas from "react-signature-canvas";

type Props = {};

const Signature = (props: Props) => {
  return (
    <SignatureCanvas
      penColor="#000000"
      canvasProps={{ width: 500, height: 300 }}
    />
  );
};

export default Signature;
