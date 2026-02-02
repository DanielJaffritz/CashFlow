import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CashFlow" },
    { name: "description", content: "Welcome to CashFlow" },
  ];
}

export default function Home() {
  return (
    <h1>home</h1>
  )
}
