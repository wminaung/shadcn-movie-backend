// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import Myaccordion from "../shadcn/Myaccordion";
// import Myalert from "../shadcn/Myalert";
// import MyAlertDialog from "../shadcn/MyAlertDialog";
// import MyAspectRatio from "../shadcn/MyAspectRatio";
// import MyAvatar from "../shadcn/MyAvatar";
// import { BreadcrumbItemType, MyBreadcrumb } from "../shadcn/MyBreadcrumb";
// import { useState } from "react";
// import { breadcrumbItems } from "../page";

// export default function Home() {
//   const params = useSearchParams();
//   const [items, setItems] = useState<BreadcrumbItemType[]>(breadcrumbItems);
//   return (
//     <div className="w-[300px]">
//       hello
//       <Myaccordion />
//       <Myalert />
//       <MyAlertDialog
//         title="hello"
//         content={<Myaccordion />}
//         trigger="click me"
//       />
//       <MyAspectRatio
//         ratio={16 / 9}
//         components={
//           <Image
//             src="https://static2.bigstockphoto.com/1/7/2/large1500/271688434.jpg"
//             alt="Image"
//             className="rounded-md object-cover"
//             fill
//           />
//         }
//         width={250}
//       />
//       <MyAvatar src="https://github.com/shadcn.png" fallback="CN" />
//       <hr />
//       {params.get("balance") == "3" && <Myalert />}
//       <MyBreadcrumb items={items} />
//     </div>
//   );
// }
import React from "react";
import { ZodError } from "zod";

const page = () => {
  return <div>page</div>;
};

export default page;
