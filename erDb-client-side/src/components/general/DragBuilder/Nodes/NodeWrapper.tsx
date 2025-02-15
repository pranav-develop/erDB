import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function NodeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Node</CardTitle>
        <CardDescription>This is a basic node</CardDescription>
      </CardHeader>
      <CardContent className="nodrag">{children}</CardContent>
      <CardFooter>This is card footer</CardFooter>
    </Card>
  );
}

export default NodeWrapper;
