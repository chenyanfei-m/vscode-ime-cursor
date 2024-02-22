import { platform } from 'node:os';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import * as vscode from 'vscode';
import * as path from 'path';

const listen = ({
  extensionPath,
  platform,
  onChange,
  onError,
}: {
  extensionPath: string;
  platform: NodeJS.Platform;
  onChange: (inputSource: string) => void;
  onError: (error: Error) => void;
}) => {
  let child: ChildProcessWithoutNullStreams | null = null;
  if (platform === 'darwin') {
    const child = spawn(path.join(extensionPath, 'bin', 'test-watch'));
    child.stdout.on('data', (data) => {
      onChange(data.toString());
    });
    child.stderr.on('error', (error: Error) => {
      onError(error);
    });
    child.on('error', (error: Error) => {
      onError(error);
    });
  }

  if (platform === 'win32') {
  }

  return child;
};

export default listen;

// function listenMac(chaneel, epath) {
//   const child = spawn(path.join(epath, './test-watch'));
//   console.log('222');

//   console.log('chaneel: ', chaneel);
//   child.on('error', (err) => {
//     console.log('err: ', err);
//     chaneel.appendLine('启动子进程失败：', err);
//   });

//   // 监听标准输出
//   child.stdout.on('data', (data) => {
//     console.log('data: ', data.toString());
//     chaneel.appendLine(`标准输出：${data}`);
//     const isAbc = data
//       .toString()
//       .includes('Current input method: com.apple.keylayout.ABC');
//     console.log('isAbc: ', isAbc);
//     const a = vscode.workspace.getConfiguration();
//     console.log('a', a);
//     const config = vscode.workspace
//       .getConfiguration('workbench')
//       .get('colorCustomizations');

//     if (isAbc) {
//       vscode.workspace
//         .getConfiguration('workbench')
//         .update(
//           'colorCustomizations',
//           {
//             ...config,
//             'editorCursor.foreground': undefined,
//           },
//           vscode.ConfigurationTarget.Global
//         )
//         .then((data) => {
//           console.log('data: ', data);
//         });
//     } else {
//       vscode.workspace
//         .getConfiguration('workbench')
//         .update(
//           'colorCustomizations',
//           {
//             ...config,
//             'editorCursor.foreground': '#ee3f4d',
//           },
//           vscode.ConfigurationTarget.Global
//         )
//         .then((data) => {
//           console.log('data: ', data);
//         });
//     }
//   });

//   // 监听标准错误输出
//   child.stderr.on('error', (data) => {
//     chaneel.appendLine(`标准错误输出：${data}`);
//   });

//   // 监听退出事件
//   child.on('close', (code) => {
//     chaneel.appendLine(`子进程退出码：${code}`);
//   });

//   return child;
// }

// module.exports = { listenMac };
