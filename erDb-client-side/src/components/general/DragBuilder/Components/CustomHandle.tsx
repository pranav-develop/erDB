import { Handle } from "@xyflow/react";

function CustomHandle(props: React.ComponentProps<typeof Handle>) {

  const style = {
    height: "10px",
    width: "10px",
  };

  return <Handle {...props} style={style} />;
}

export default CustomHandle;
