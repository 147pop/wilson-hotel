import Landing from "@/components/Landing";
import { getTarifas } from "@/lib/tarifas";

export default async function Home() {
  const { tarifas, live } = await getTarifas();
  return <Landing tarifas={tarifas} live={live} />;
}
