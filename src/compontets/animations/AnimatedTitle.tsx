import { useState, useEffect } from "react";

export const AnimatedTitle = () => {
  const [newTitle, setNewTitle] = useState<string[]>([]);

  const title: string | number = "List of TODOs";
  const titleArr = title.split("");
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

  console.log(typeof titleArr, "titleArr");
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
{
  /* <h2 className="todo__title">List of TODOs</h2>; */
}
