import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AttributeData, EAttributeProperties } from "@/types/DragBuilder";
import { ATTRIBUTE_PROPERTIES_DATA } from "./index";
import { produce } from "immer";
import { useCallback } from "react";



interface AttributePropertiesProps {
  attributeProperties: AttributeData["properties"];
  setAttributeProperties: (properties: AttributeData["properties"]) => void;
}

function AttributeProperties({
  attributeProperties,
  setAttributeProperties,
}: AttributePropertiesProps) {

  const handlePropertySelect = useCallback((
    selectedProperty: EAttributeProperties,
    checkedStatus: boolean
  ) => {
    const attributeData = ATTRIBUTE_PROPERTIES_DATA[selectedProperty];
    const { disables, checks } = attributeData;

    // const updatedPropertyData = produce(attributeProperties, (prev) => {
    //   console.log("calling produce")
    //   disables.forEach((disable) => {
    //     prev[disable].disabled = checkedStatus;
    //   });
    //   checks.forEach((check) => {
    //     prev[check].checked = checkedStatus;
    //   });
    //   //check the current one
    //   prev[selectedProperty].checked = checkedStatus;
    // });

    setAttributeProperties({
      ...attributeProperties,
      [selectedProperty]: {
        checked: checkedStatus,
        disabled: false
      }
    });
  }, [attributeProperties]);

  return (
    <div>
      <Label htmlFor="name" className="font-bold text-xs">
        Properties
      </Label>
      <div className="grid grid-flow-col grid-rows-3 gap-4 pt-1">
        {Object.values(ATTRIBUTE_PROPERTIES_DATA).map((property) => (
          <div
            key={`attribute-property-${property.key}`}
            className="flex items-center justify-start gap-2"
          >
            <Checkbox
              id={property.key}
              disabled={attributeProperties[property.type].disabled}
              onCheckedChange={(checked) =>
                handlePropertySelect(property.type, checked === true)
              }
              checked={attributeProperties[property.type].checked}
            />
            <Label htmlFor={property.key} className="text-xs">
              {property.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttributeProperties;
