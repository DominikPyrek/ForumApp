import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavItem from "./NavItem";

export default function NavBar() {
  return (
    <div className="flex justify-center w-full backdrop-blur-lg bg-black/15 border-b border-white/15">
      <NavigationMenu viewport={false} className="px-8 py-3">
        <NavigationMenuList className="[&>li>a,button,div]:text-lg gap-6">
          <NavItem type="link" link="/" text="Home" />
          <NavItem
            type="dropdown"
            text="Discussions"
            subItems={[
              {
                link: "/posts",
                text: "Newest Posts",
              },
              { link: "/liked-posts", text: "Liked Posts" },
            ]}
          />
          <NavItem
            type="dropdown"
            text="Your Creations"
            subItems={[
              { link: "/your-posts", text: "Created Posts" },
              { link: "/your-comments", text: "Created Comments" },
            ]}
          />
          <NavItem type="link" link="/login" text="Login" />
          <NavItem type="link" link="/register" text="Register" />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
