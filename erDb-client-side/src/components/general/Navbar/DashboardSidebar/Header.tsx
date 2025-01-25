import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarHeader } from "@/components/ui/sidebar";

function Header() {
  return (
    <SidebarHeader>
      <div className="flex items-center justify-between p-2">
        <div
          className="w-10 h-10 bg-center bg-no-repeat bg-cover bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md"
          // style={{
          //   backgroundImage:
          //     "url('https://avatars.githubusercontent.com/u/56189362?v=4')",
          // }}
        ></div>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
      </div>
    </SidebarHeader>
  );
}

export default Header;
