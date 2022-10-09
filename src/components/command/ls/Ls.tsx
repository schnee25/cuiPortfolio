import React from "react";
import { FC } from "react";

type Props = {
  dirItem: string[];
};

const Ls: FC<Props> = ({ dirItem }) => (
  <p>
    {/* ファイルは白 */}
    {dirItem
      .filter((fileName) => fileName.includes("."))
      .map((item) => (
        <span key={item}>{item}</span>
      ))}
    {/* フォルダは青 */}
    {dirItem
      .filter((fileName) => !fileName.includes("."))
      .map((item) => (
        <span key={item}>{item}</span>
      ))}
  </p>
);

export default Ls;