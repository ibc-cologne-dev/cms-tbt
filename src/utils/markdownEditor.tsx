import React from "react";
import {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";

type Color = "orange" | "lightblue";

const executeColor = (state: TextState, api: TextAreaTextApi, color: Color) => {
  api.replaceSelection(colorElementText(color, state.selectedText));
};

const colorElementText = (color: Color, children: string) =>
  `<span style="color:${color};">${children}</span>\n`;

const ColorIcon: React.FC<{ color: Color }> = ({ color }) => (
  <div style={{ width: 12, height: 12, backgroundColor: color }} />
);

const orangeColor: ICommand = {
  name: "Orange",
  keyCommand: "orange",
  buttonProps: { "aria-label": "Change color to orange" },
  icon: <ColorIcon color="orange" />,
  execute: (state, api) => executeColor(state, api, "orange"),
};

const blueColor: ICommand = {
  name: "Blue",
  keyCommand: "blue",
  buttonProps: { "aria-label": "Change color to blue" },
  icon: <ColorIcon color="lightblue" />,
  execute: (state, api) => executeColor(state, api, "lightblue"),
};

export const markdownEditorCommands = [
  commands.group([commands.title1, commands.title2, commands.title3], {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title" },
  }),
  commands.bold,
  commands.italic,
  commands.orderedListCommand,
  commands.unorderedListCommand,
  commands.divider,
  orangeColor,
  blueColor,
  commands.divider,
  commands.hr,
];
