import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

interface NavItemProps {
  type: "link" | "dropdown";
  link?: string;
  text: string;
  subItems?: { link: string; text: string }[];
}

export default function NavItem(props: NavItemProps) {
  if (props.type === "link") {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <NavLink to={props.link!}>{props.text}</NavLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{props.text}</NavigationMenuTrigger>
      <NavigationMenuContent>
        {props.subItems?.map((item) => (
          <NavigationMenuLink key={item.link} asChild>
            <NavLink to={item.link}>{item.text}</NavLink>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
