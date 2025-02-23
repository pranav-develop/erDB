import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

function NodeWrapper({
  title,
  description,
  children,
}: {
  title: ReactNode | string;
  description: ReactNode | string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-3 rounded-lg min-w-[250px] min-h-24">
      <div className="">
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <div className="font-sm">{children}</div>
    </Card>
  );
}

export default NodeWrapper;
