import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Users } from "lucide-react";

const Features = () => {
  return (
    <div>
      {/* Features Section */}
      {/* Features Section */}
      <section className="py-16 px-6  text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {[
              {
                title: "Expert Instructors",
                icon: <CheckCircle size={40} className="text-blue-500" />,
                desc: "Learn from industry professionals.",
              },
              {
                title: "Community Support",
                icon: <Users size={40} className="text-green-500" />,
                desc: "Engage with learners worldwide.",
              },
              {
                title: "Flexible Learning",
                icon: <BookOpen size={40} className="text-yellow-500" />,
                desc: "Study at your own pace.",
              },
            ].map((feature, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader className="flex flex-col items-center">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
