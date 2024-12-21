"use client";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { usePathname } from "next/navigation";

export interface BreadcrumbItemType {
  href: string;
  label: string;
}

interface Props {
  items: BreadcrumbItemType[];
}

export function MyBreadcrumb({ items }: Props) {
  const path = usePathname();
  const getPageName = () => {
    const item = items.filter((item) => item.href === path)[0];
    return item.label;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}> {item.label} </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{getPageName()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
