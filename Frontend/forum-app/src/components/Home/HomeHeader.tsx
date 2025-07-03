import { Button } from "../ui/button";
import { LogIn, Compass } from "lucide-react";
import { NavLink } from "react-router";
export default function HomeHeader() {
  return (
    <section className="mx-auto max-w-4xl text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Welcome to <span className="text-primary">ForumApp</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Where enthusiasts, experts, and curious minds connect.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" className="w-full sm:w-auto">
          <LogIn className="mr-2 h-4 w-4" />
          <NavLink to="/register">Join Now</NavLink>
        </Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          <Compass className="mr-2 h-4 w-4" />
          <NavLink to="/posts">Browse Topics</NavLink>
        </Button>
      </div>
    </section>
  );
}
