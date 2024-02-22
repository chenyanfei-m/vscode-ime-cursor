import * as vscode from 'vscode';
import listen from './listen';
import isIME from './utils/is.ime';
import { resetCursor, setActiveCursor } from './utils/set.cursor.color';

export function activate(context: vscode.ExtensionContext) {
  const outChannel = vscode.window.createOutputChannel(
    context.extension.packageJSON.name
  );
  outChannel.appendLine('Start');
  outChannel.show(true); // true表示激活此视图

  const handleChange = (inputSource: string) => {
    outChannel.appendLine(`${inputSource}`);

    if (isIME(inputSource)) {
      setActiveCursor();
    } else {
      resetCursor();
    }
  };

  listen({
    extensionPath: context.extensionPath,
    platform: process.platform,
    onChange: handleChange,
    onError: (error: Error) => {
      outChannel.appendLine(`错误：${error.message}`);
    },
  });
}

export function deactivate() {}
