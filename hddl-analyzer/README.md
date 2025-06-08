# HDDL Parser
A Visual Studio Code extension that provides language support for Hierarchical Domain Definition Language (HDDL) files through real-time validation and error checking.

## Features
- **Real-time validation** of HDDL domain and problem files
- **Error highlighting** with actionable error messages
- **Syntax checking** based on official HDDL specification
- **Type checking** for parameters, predicates, and tasks
- **Detection of common modeling issues** like undefined entities, cyclic dependencies, and contradictory formulas

## Prerequisites
This extension requires the HDDL Parser language server to be built separately.

### Building the HDDL Parser Server
1. Clone the HDDL Parser repository:
   ```bash
   git clone https://github.com/koala-planner/HDDL-Parser
   ```
2. Follow the build instructions in the repository to compile the `language_server` binary
3. Note the path to the compiled `language_server.exe` (or `language_server` on Unix systems)

## Configuration
After installing the extension, you must configure the path to the HDDL Parser language server:
1. Open VSCode Settings (File → Preferences → Settings)
2. Search for "HDDL Analyzer"
3. Set the **languageServer.path** to the full path of your compiled `language_server` binary

## Usage
Once configured, the extension automatically activates when you open `.hddl` files. Validation errors and warnings will appear in the editor.

## Supported Error Detection
- Basic syntax issues
- Inconsistent parameter usage
- Undefined entities (predicates, types, objects, tasks)
- Duplicate definitions
- Cyclic type declarations
- Undeclared parameters
- Task network issues
- Contradictory formulas
- Unrefinable tasks

## Troubleshooting
If the extension is not working:
1. Verify the HDDL Parser server path is correct in settings
2. Ensure the `language_server` binary has execute permissions
3. Check the Output panel (View → Output → HDDL) for error messages