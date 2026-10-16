import { RouteLink } from "@/types";
import {
  IoHomeOutline,
  IoMailOutline,
  IoNavigate,
  IoPencilOutline,
  IoRibbonOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const links: RouteLink[] = [
  {
    path: "/",
    name: "Home",
    icon: <IoHomeOutline />,
  },
  {
    path: "/about",
    name: "About",
    icon: <FaRegUserCircle />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <IoNavigate />,
  },
  {
    path: "/certifications",
    name: "Certifications",
    icon: <IoRibbonOutline />,
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: <IoPencilOutline />,
  },
  {
    path: "/services",
    name: "Services",
    icon: <IoBriefcaseOutline />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <IoMailOutline />,
  },
];

export default links;
