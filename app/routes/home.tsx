import HomePageNav from "~/components/HomePageNav";
import type { Route } from "./+types/home";
import Hero from "~/components/Hero";
import Foot from "~/components/Foot";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CashFlow" },
    { name: "description", content: "Welcome to CashFlow" },
  ];
}

export default function Home() {
  return (
    <>
      <HomePageNav />
      <Hero />
      <Foot />
    </>
  )
}
