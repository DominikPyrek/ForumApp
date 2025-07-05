import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavItem from "./NavItem";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import {
  LogOutIcon,
  LogInIcon,
  UserPlus,
  Home,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Logout } from "@/services/api";
import { useNavigate } from "react-router";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center w-full backdrop-blur-lg bg-black/15 border-b border-white/15">
      <NavigationMenu viewport={false} className="px-8 py-3">
        <NavigationMenuList className="[&>li>a,button,div]:text-lg gap-6">
          <NavItem
            type="link"
            link="/"
            text="Home"
            onlyWhenLoggedIn={false}
            icon={Home}
          />
          <NavItem
            type="dropdown"
            text="Discussions"
            subItems={[
              {
                link: "/posts",
                text: "Newest Posts",
              },
            ]}
            onlyWhenLoggedIn={false}
            icon={MessageSquare}
          />
          <NavItem
            type="dropdown"
            text="Your Creations"
            subItems={[
              { link: "/your-posts", text: "Created Posts" },
              { link: "/your-comments", text: "Created Comments" },
            ]}
            onlyWhenLoggedIn={true}
            icon={Sparkles}
          />
          {user ? (
            <>
              <Button
                variant={"outline"}
                className="border-none"
                onClick={() => {
                  Logout();
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
                <LogOutIcon />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>Your Avatar</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <NavItem
                type="link"
                link="/login"
                text="Login"
                onlyWhenLoggedIn={false}
                icon={LogInIcon}
              />
              <NavItem
                type="link"
                link="/register"
                text="Register"
                onlyWhenLoggedIn={false}
                icon={UserPlus}
              />
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
