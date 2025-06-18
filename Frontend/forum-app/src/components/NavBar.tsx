import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavItem from "./NavItem";

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavItem type="link" link="/" text="Home" />
        <NavItem
          type="dropdown"
          text="Posts"
          subItems={[
            { link: "/posts", text: "Newest Posts" },
            { link: "/liked-posts", text: "Liked Posts" },
          ]}
        />
        <NavItem
          type="dropdown"
          text="Your Creations"
          subItems={[
            { link: "/your-posts", text: "Created Comments" },
            { link: "/your-comments", text: "Created Posts" },
          ]}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
