import type { ReactNode } from "react";
import Image from "next/image";

type QuestionContextProps = {
  content: string;
};

const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
const boldPattern = /(\*\*[^*]+\*\*)/g;

function isEnemImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "enem.dev";
  } catch {
    return false;
  }
}

function formatText(value: string, key: string) {
  return value.split(boldPattern).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${key}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function QuestionContext({ content }: QuestionContextProps) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(markdownImagePattern)) {
    const [markdown, alt, source] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {formatText(content.slice(lastIndex, index), `text-${lastIndex}`)}
        </span>,
      );
    }

    if (isEnemImageUrl(source)) {
      nodes.push(
        <div
          key={`image-${index}`}
          className="relative my-5 h-[min(55vw,32.5rem)] min-h-52 w-full"
        >
          <Image
            src={source}
            alt={alt || "Imagem de apoio da questão"}
            fill
            sizes="(max-width: 640px) 100vw, 700px"
            className="rounded-xl object-contain"
          />
        </div>,
      );
    } else {
      nodes.push(markdown);
    }

    lastIndex = index + markdown.length;
  }

  if (lastIndex < content.length) {
    nodes.push(
      <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
        {formatText(content.slice(lastIndex), `text-${lastIndex}`)}
      </span>,
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#e3e7f1] border-l-4 border-l-mentor-blue bg-white px-5 py-6 text-[1.0625rem] leading-8 text-[#35446f] sm:px-7 sm:py-7 sm:text-lg sm:leading-9">
      {nodes}
    </div>
  );
}
