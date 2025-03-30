import { Input } from "@/components/ui/input";
import { AttributeData } from "@/types/DragBuilder";
import { Label } from "@radix-ui/react-label";
import { Updater } from "use-immer";

interface AttributePropertyValuesProps {
  setNodeData: Updater<AttributeData>;
  nodeData: AttributeData
}

function AttributePropertyValues({
  nodeData,
  setNodeData,
}: AttributePropertyValuesProps) {

  const { properties, defaultValue } = nodeData;

  return (
    <>
      {properties.DEFAULT.checked && (
        <div className="pt-1">
          <Label className="font-bold text-xs" htmlFor="Default Value">
            Default Value
          </Label>
          <Input
            className="text-sm"
            type="text"
            id={`field_default_value`}
            placeholder="Default Value"
            value={defaultValue}
            onChange={(event) => {
              const { value } = event.target;
              setNodeData((prev) => {
                prev.defaultValue = value;
              })
            }}
          />
        </div>
      )}
      {/* <IfCheck
        condition={properties.DEFAULT.checked}
        success={<div className="pt-1">
            <Label className="font-bold text-xs" htmlFor="Default Value">
              Default Value
            </Label>
            <Input
              className="text-sm"
              type="text"
              id={`field_default_value`}
              placeholder="Default Value"
            />
          </div>}
      /> */}
    </>
  );
}

export default AttributePropertyValues;
