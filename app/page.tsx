import { PurpleHero } from "@/components/hero/PurpleHero";

export default function Home() {
  return (
    <main className="">
      <PurpleHero
        title="AGiOS Stay Updated "
        variant="slate"
        dotSize="small"
        dotOpacity="light"
        glowIntensity="none"
        className="border-t border-indigo-500/10"
      ></PurpleHero>
    </main>
  );
}
