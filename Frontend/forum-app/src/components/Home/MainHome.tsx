import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Search, Users, MessageCircle } from "lucide-react";

export default function MainHome() {
  return (
    <>
      <section className="grid gap-6 md:grid-cols-3 mb-12">
        {[
          {
            title: "Discover Topics",
            badge: "Explore",
            description: "Tech, gaming, business—find your niche.",
            icon: Search,
          },
          {
            title: "Connect",
            badge: "Community",
            description: "Share ideas with like-minded people.",
            icon: Users,
          },
          {
            title: "Engage",
            badge: "Discuss",
            description: "Start conversations and get feedback.",
            icon: MessageCircle,
          },
        ].map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="w-fit">{feature.badge} </Badge>
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
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
              <Badge key={item} className="justify-center py-1.5 text-md">
                ✓ {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
