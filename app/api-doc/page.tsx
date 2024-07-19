import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container bg-white text-black rounded-md p-1">
      <ReactSwagger spec={spec} />
    </section>
  );
}
