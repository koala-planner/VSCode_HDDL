// src/binaryManager.ts
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as vscode from 'vscode';

export class BinaryManager {
  private extensionPath: string;

  constructor(context: vscode.ExtensionContext) {
    this.extensionPath = context.extensionPath;
  }

  getBinaryPath(): string {
    const platform = this.getPlatform();
    const arch = this.getArchitecture();
    const extension = platform === 'win32' ? '.exe' : '';
    
    const binaryName = `language_server${extension}`;
    const binaryPath = path.join(
      this.extensionPath, 
      'bin', 
      `${platform}-${arch}`, 
      binaryName
    );

    if (!fs.existsSync(binaryPath)) {
      throw new Error(`Binary not found for platform ${platform}-${arch}`);
    } else {
        this.ensureIsExecutable();
    }
    return binaryPath;
  }

  private getPlatform(): string {
    const platform = os.platform();
    switch (platform) {
      case 'win32': return 'win32';
      case 'darwin': return 'darwin';
      case 'linux': return 'linux';
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private getArchitecture(): string {
    const arch = os.arch();
    switch (arch) {
      case 'x64': return 'x64';
      case 'arm64': return 'arm64';
      case 'ia32': return 'x86';
      default:
        throw new Error(`Unsupported architecture: ${arch}`);
    }
  }

  async ensureIsExecutable(): Promise<void> {
    if (os.platform() !== 'win32') {
      const binaryPath = this.getBinaryPath();
      const { chmod } = await import('fs/promises');
      await chmod(binaryPath, '755');
    }
  }
}