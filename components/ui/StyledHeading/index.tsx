type StyledHeadingProps = {
  text: string;
  headingClass?: string;
  subHeadingClass?: string;
};

export default function StyledHeading({
  text,
  headingClass = "uppercase text-3xl md:text-5xl",
  subHeadingClass = "font-sub-heading font-bold text-6xl px-1",
}: StyledHeadingProps) {
  const parts = text.split(",");
  const wordsWithStyle: { word: string; className: string; addSpace: boolean }[] = [];

  parts.forEach((part, partIndex) => {
    const words = part.trim().split(" ");
    words.forEach((word, wordIndex) => {
      let className = headingClass;
      let displayWord = word;

      if (parts.length > 1) {
        className = partIndex === 0 ? headingClass : subHeadingClass;
        if (partIndex === 0) displayWord = word.toUpperCase();
      } else {
        className = wordIndex % 2 === 1 ? subHeadingClass : headingClass;
      }

      wordsWithStyle.push({ word: displayWord, className, addSpace: true });
    });

    if (partIndex < parts.length - 1) {
      wordsWithStyle.push({ word: ",", className: headingClass, addSpace: true });
    }
  });

  return (
    <h2 className="leading-tight">
      {wordsWithStyle.map(({ word, className, addSpace }, index) => (
        <span key={index} className={className}>
          {word}
          {addSpace && word !== "," ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
