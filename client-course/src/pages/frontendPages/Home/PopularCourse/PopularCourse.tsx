import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

const PopularCourse = () => {
  return (
    <div>
      {/* Popular Courses Section */}
      <section className="py-16 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-6">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
            {[1, 2, 3,4].map((course) => (
              <Card key={course} className="shadow-lg">
                <CardHeader>
                  <CardTitle>Course Title {course}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Brief description of the course goes here.</p>
                  <Button className="mt-4 w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularCourse;
