import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Fragment, ReactNode } from "react";

interface BreadcrumbLinks {
  href?: string;
  text: string;
}

function DashboardBreadCrumbs({ items }: { items: BreadcrumbLinks[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <Fragment key={`breadcrumbs-${item.text}-${index}`}>
              <BreadcrumbItem>
                {item.href && item.href.length > 0 ? (
                  <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.text}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index == items.length - 1 ? null : <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function DashboardPageHeader({
  children,
  breadcrumbs,
}: {
  children?: ReactNode;
  breadcrumbs: BreadcrumbLinks[];
}) {
  return (
    <div className="w-100 h-[48px] px-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <DashboardBreadCrumbs items={breadcrumbs} />
      </div>
      {children}
    </div>
  );
}

export default DashboardPageHeader;
