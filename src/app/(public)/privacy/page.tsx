import fs from "node:fs/promises";
import path from "node:path";

export const metadata = {
  title: "개인정보처리방침 | 해나루 종합설비",
};

export default async function PrivacyPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/content/privacy.md"),
    "utf-8",
  );

  return (
    <section className="px-4 py-12">
      <pre className="whitespace-pre-wrap font-sans">{content}</pre>
    </section>
  );
}
