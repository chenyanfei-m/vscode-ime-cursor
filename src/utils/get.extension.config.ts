import * as vscode from 'vscode';

const getExtensionConfig = (extension: string) => {
  const config = vscode.workspace.getConfiguration(extension);
  return config;
};

export default getExtensionConfig;
