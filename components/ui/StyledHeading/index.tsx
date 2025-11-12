type StyledHeadingProps = {
  text: string;
  normalClass?: string;
  tangerineClass?: string;
};

export default function StyledHeading({
  text,
  normalClass = "uppercase text-3xl md:text-5xl",
  tangerineClass = "font-[tangerine] font-bold text-6xl px-1",
}: StyledHeadingProps) {
  const parts = text.split(",");
  const wordsWithStyle: { word: string; className: string; addSpace: boolean }[] = [];

  parts.forEach((part, partIndex) => {
    const words = part.trim().split(" ");
    words.forEach((word, wordIndex) => {
      let className = normalClass;
      let displayWord = word;

      if (parts.length > 1) {
        className = partIndex === 0 ? normalClass : tangerineClass;
        if (partIndex === 0) displayWord = word.toUpperCase();
      } else {
        className = wordIndex % 2 === 1 ? tangerineClass : normalClass;
      }

      wordsWithStyle.push({ word: displayWord, className, addSpace: true });
    });

    if (partIndex < parts.length - 1) {
      wordsWithStyle.push({ word: ",", className: normalClass, addSpace: true });
    }
  });

  return (
    <h2 className="">
      {wordsWithStyle.map(({ word, className, addSpace }, index) => (
        <span key={index} className={className}>
          {word}
          {addSpace && word !== "," ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
