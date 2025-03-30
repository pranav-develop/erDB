import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AttributeData, EAttributeProperties } from "@/types/DragBuilder";
import { ATTRIBUTE_PROPERTIES_DATA } from "./index";
import { useCallback } from "react";

interface AttributePropertiesProps {
  attributeProperties: AttributeData["properties"];
  setAttributeProperties: (properties: AttributeData["properties"]) => void;
}

function AttributeProperties({
  attributeProperties,
  setAttributeProperties,
}: AttributePropertiesProps) {
  const handlePropertySelect = useCallback(
    (selectedProperty: EAttributeProperties, checkedStatus: boolean) => {
      setAttributeProperties({
        ...attributeProperties,
        [selectedProperty]: {
          checked: checkedStatus,
        },
      });
    },
    [attributeProperties]
  );

  return (
    <div>
      <Label htmlFor="name" className="font-bold text-xs">
        Properties
      </Label>
      <div className="grid grid-flow-col grid-rows-3 gap-4 pt-1">
        {Object.values(ATTRIBUTE_PROPERTIES_DATA).map((property) => {
          const { checked, disabled } = determineIsCheckedAndDisabled({
            currentKey: property.type,
            propertiesData: attributeProperties,
          });
          return (
            <div
              key={`attribute-property-${property.key}`}
              className="flex items-center justify-start gap-2"
            >
              <Checkbox
                id={property.key}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  handlePropertySelect(property.type, checked === true)
                }
                checked={checked}
              />
              <Label htmlFor={property.key} className="text-xs">
                {property.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttributeProperties;

function determineIsCheckedAndDisabled({
  currentKey,
  propertiesData,
}: {
  currentKey: EAttributeProperties;
  propertiesData: AttributeData["properties"];
}) {
  const properties = {
    checked: false,
    disabled: false,
  };

  if (propertiesData[currentKey].checked) {
    properties.checked = true;
  }

  let propKey: keyof typeof propertiesData;
  for (propKey in propertiesData) {
    const propData = propertiesData[propKey];
    if (!propData.checked) {
      continue;
    }
    const { checks, disables } = ATTRIBUTE_PROPERTIES_DATA[propKey];
    if (checks.includes(currentKey)) properties.checked = true;
    if (disables.includes(currentKey)) {
      properties.disabled = true;
    }
  }
  return properties;
}
