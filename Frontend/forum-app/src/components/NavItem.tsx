import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  type: "link" | "dropdown";
  link?: string;
  text: string;
  icon?: LucideIcon;
  onlyWhenLoggedIn: boolean;
  subItems?: { link: string; text: string; icon?: LucideIcon }[];
}

export default function NavItem({
  type,
  link,
  text,
  icon: Icon,
  onlyWhenLoggedIn,
  subItems = [],
}: NavItemProps) {
  const { user } = useContext(UserContext);
  const disabledClass = "pointer-events-none opacity-50 cursor-not-allowed";
  const disabled = !user && onlyWhenLoggedIn ? disabledClass : "";

  if (type === "link") {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={cn(navigationMenuTriggerStyle(), disabled)}
        >
          <NavLink
            to={link!}
            className="flex flex-row items-center justify-center gap-3"
          >
            {Icon && <Icon className="!h-5 !w-5 text-stone-50" />}
            <span>{text}</span>
          </NavLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className={disabled}>
      <NavigationMenuTrigger className="flex flex-row items-center justify-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-stone-50" />}
        {text}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div>
          {subItems?.map((item) => (
            <NavigationMenuLink key={item.link} asChild className={disabled}>
              <NavLink to={item.link}>
                <span>{item.text}</span>
              </NavLink>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
