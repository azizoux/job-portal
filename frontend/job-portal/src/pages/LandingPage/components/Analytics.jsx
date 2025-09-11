import { Briefcase, Target, TrendingUp, Users } from "lucide-react";
import React from "react";

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2.4M+",
      growth: "+15%",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Jobs Posted",
      value: "150k+",
      growth: "+22%",
      color: "purple",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "89K+",
      growth: "+18%",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Match Rate",
      value: "94%",
      growth: "+8%",
      color: "orange",
    },
  ];
  return (
    <section>
      <p>Analytics</p>
    </section>
  );
};

export default Analytics;
