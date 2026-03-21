import HomePageNav from "~/components/layout/HomePageNav";
import type { Route } from "./+types/home";
import Hero from "~/components/common/beforeAuth/Hero";
import Foot from "~/components/common/beforeAuth/Foot";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CashFlow" },
    { name: "description", content: "Welcome to CashFlow" },
  ];
}

export default function Home() {
  return (
    <section className="w-full dark:bg-zinc-900">
      <HomePageNav />
      <Hero />
      <Foot />
    </section>
  )
}
