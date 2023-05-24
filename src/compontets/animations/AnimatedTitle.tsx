export const AnimatedTitle: React.FC = () => {
  const animTitle: string[] = [
    "L",
    "i",
    "s",
    "t",
    "🐈‍⬛",
    "o",
    "f",
    "🐧",
    "T",
    "O",
    "D",
    "O",
    "s",
  ];

  return (
    <div className="anim-title__box">
      {animTitle.map((ch: string, index: number) => {
        return (
          <h2
            style={{
              animation: "title-letters 0.5s ease",
              animationDelay: `${index / 8}s`,
              animationFillMode: "forwards",
            }}
            className="anim-title__letter"
            key={index}
          >
            {ch}
          </h2>
        );
      })}
    </div>
  );
};
