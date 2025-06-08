// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import * as path from 'path';

import * as fs from 'fs';
 
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Trace,
	TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Communication channel with user in VSCode
	const outputChannel = vscode.window.createOutputChannel('HDDL Language Server');

	// Read the configuration setting for the path of server binary
	const config = vscode.workspace.getConfiguration('hddl-analyzer');
	const userProvidedPath = config.get<string | null>('languageServer.path', null);
	console.log(userProvidedPath);
	// assert the user has configured a server
	if (userProvidedPath) {
		outputChannel.appendLine('Attempting to run the LSP server...');
		// Check if server executable exists
		if (fs.existsSync(userProvidedPath)) {
			outputChannel.appendLine(`Server executable found at: ${userProvidedPath}`);
			const serverOptions: ServerOptions = {
				run: {
					command: userProvidedPath,
					transport: TransportKind.stdio
				},
				debug: {
					command: userProvidedPath,
					transport: TransportKind.stdio,
				}
			};
			// Options to control the language client
			const clientOptions: LanguageClientOptions = {
				// Register the server for HDDL documents
				documentSelector: [{ scheme: 'file', language: 'hddl' }],
				synchronize: {
					// Notify the server about file changes to relevant files
					fileEvents: vscode.workspace.createFileSystemWatcher('**/*.hddl')
				},
				// Shows LSP communication
				outputChannel: outputChannel,
				traceOutputChannel: outputChannel,

				// Enable verbose tracing to see all LSP messages
				initializationOptions: {},
				middleware: {}
			};

			// Create the language client and start the client.
			client = new LanguageClient(
				'hddl-language-server',
				'HDDL Language Server',
				serverOptions,
				clientOptions
			);

			client.setTrace(Trace.Verbose);

			// Start the client. This will also launch the server
			client.start().then(() => {
				outputChannel.appendLine('=== HDDL Analyzer Activated ===');
				outputChannel.appendLine('Client state: ' + client.state);
			}).catch((error) => {
				outputChannel.appendLine('Failed to start language server: ' + error);
			});
		}
	} else {
		outputChannel.appendLine(`ERROR: Server executable not found at: ${userProvidedPath}`);
		vscode.window.showWarningMessage('Language server path is undefined. Please set it in /settings/extensions/HDDL Analyzer.');
		return;
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}