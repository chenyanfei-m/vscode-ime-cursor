import * as vscode from 'vscode';
import getExtensionConfig from './get.extension.config';

// TODO: theme change
const defaultCursor = {
  color: vscode.workspace
    .getConfiguration('workbench')
    .get('colorCustomizations.editorCursor.foreground') as string,
  style: vscode.workspace
    .getConfiguration('editor')
    .get('cursorStyle') as vscode.TextEditorCursorStyle,
  blinking: vscode.workspace
    .getConfiguration('editor')
    .get('cursorBlinking') as string,
};
const getActiveCursor = () => {
  const extConfig = getExtensionConfig('imeCursor');
  const activeCursor = {
    color: extConfig.get('activeColor') as string,
    style: extConfig.get('activeStyle') as vscode.TextEditorCursorStyle,
  };
  return activeCursor;
};

const setCursor = ({
  color,
  style,
  blinking,
}: {
  color?: string;
  style?: vscode.TextEditorCursorStyle;
  blinking?: string;
}) => {
  const config = vscode.workspace.getConfiguration('workbench');
  const colorConfig = config.get('colorCustomizations') || {};
  config.update(
    'colorCustomizations',
    {
      ...colorConfig,
      'editorCursor.foreground': color,
    },
    vscode.ConfigurationTarget.Global
  );

  const editorConfig = vscode.workspace.getConfiguration('editor');
  editorConfig.update('cursorStyle', style, vscode.ConfigurationTarget.Global);
  editorConfig.update(
    'cursorBlinking',
    blinking,
    vscode.ConfigurationTarget.Global
  );
};

export const setActiveCursor = () => {
  setCursor(getActiveCursor());
};

export const resetCursor = () => {
  setCursor(defaultCursor);
};

export default setCursor;
