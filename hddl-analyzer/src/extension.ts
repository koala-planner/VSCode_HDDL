// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { BinaryManager } from './binaryManager';


import * as fs from 'fs';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Trace,
	TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;
let binaryManager: BinaryManager;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Communication channel with user in VSCode
	const outputChannel = vscode.window.createOutputChannel('HDDL Language Server');

	binaryManager = new BinaryManager(context);
	outputChannel.appendLine('Attempting to run the LSP server...');
	let binaryPath = binaryManager.getBinaryPath();
	outputChannel.appendLine(`Server executable found at: ${binaryPath}`);
	const serverOptions: ServerOptions = {
		run: {
			command: binaryPath,
			transport: TransportKind.stdio
		},
		debug: {
			command: binaryPath,
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

// This method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}