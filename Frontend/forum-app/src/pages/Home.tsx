import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 mt-10">
      <section className="mx-auto max-w-4xl text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-primary">ForumApp</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Where enthusiasts, experts, and curious minds connect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            <NavLink to="/register">Join Now</NavLink>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <NavLink to="/posts">Browse Topics</NavLink>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3 mb-12">
        {[
          {
            title: "Discover Topics",
            badge: "Explore",
            description: "Tech, gaming, business—find your niche.",
          },
          {
            title: "Connect",
            badge: "Community",
            description: "Share ideas with like-minded people.",
          },
          {
            title: "Engage",
            badge: "Discuss",
            description: "Start conversations and get feedback.",
          },
        ].map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <Badge className="w-fit">{feature.badge}</Badge>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-lg ">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why ForumApp?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            {[
              "Easy-to-use interface",
              "Friendly, moderated community",
              "No paywalls",
            ].map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="justify-center py-1.5 text-md"
              >
                ✓ {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
