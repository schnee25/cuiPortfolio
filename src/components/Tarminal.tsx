import React, { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_PALETTE } from "../styles/color_palette";
import Header from "./organisms/header";
import handler from "./Command";
import Directory from "./Directory";
import {
  HOME_PATH,
  YUKI_PATH,
  PRODUCTS_PATH,
  CONTACTS_PATH,
  LS_HOME_ITEM,
  LS_YUKI_ITEM,
  LS_PRODUCTS_ITEM,
  LS_CONTACTS_ITEM,
} from "../util";

let historyNum = 0;
let historyStateNum = 0;
const Terminal: FC = () => {
  const [command, setCommand] = useState("");
  const [replies, setReplies] = useState([]);
  const [logs, setLogs] = useState([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentDir, setCurrentDir] = useState(YUKI_PATH);
  const [isFormatted, setIsFormatted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const res = handler(command, currentDir, setCurrentDir, isFormatted, setIsFormatted);
      setReplies([...replies, res]);
      setLogs([...logs, { command: command, dir: currentDir }]);
      setCommand("");
      if (res === "clear") {
        setReplies([]);
        setLogs([]);
      }

      // 履歴の保存
      if (command !== "") {
        setCommandHistory([...commandHistory, command]);
        historyNum += 1;
        historyStateNum = historyNum;
      }

      window.setTimeout(scrollBottom, 100);
    }
  };
  const scrollBottom = (): void => {
    document.getElementById("bottom").scrollIntoView({ behavior: "auto" });
  };

  const handleOnTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      // 次の対象のオブジェクトに移動しない
      e.preventDefault();
    }
  };

  return (
    <>
      <Hscreen />
      <Container>
        <Header />
        aaa
        <div>
          <div>
            <div></div>
            <div>
              {logs.map((log: { command: string; dir: string }, idx: number) => (
                <div key={idx}>
                  <span>
                    <span>yuki@portfolio</span>
                    <span>:</span>
                    <span>~</span>
                    <Directory dir={log.dir} />
                    <span> $ </span>
                  </span>
                  <span>{log.command}</span>
                  {replies[idx]}
                </div>
              ))}
              <span>
                <span>yuki@portfolio</span>
                <span>:</span>
                <span>~</span>
                <Directory dir={currentDir} />
                <span> $ </span>
              </span>
              <input
                id="command-area"
                type="text"
                autoComplete="off"
                value={command}
                onChange={handleChange}
                onKeyPress={handleOnEnter}
                onKeyDown={handleOnTab}
              />
              <div id="bottom" style={{ float: "left" }} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: ${COLOR_PALETTE.BLACK30};
  border-radius: 10px;
`;

const Hscreen = styled.div`
  height: 30vh;
`;

export default Terminal;
