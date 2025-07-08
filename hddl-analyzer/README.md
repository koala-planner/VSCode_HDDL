# HDDL Parser
A Visual Studio Code extension that provides language support for Hierarchical Domain Definition Language (HDDL) files through real-time validation and error checking.

## Features
- **Real-time validation** of HDDL domain and problem files
- **Error highlighting** with actionable error messages
- **Syntax checking** based on official HDDL specification
- **Type checking** for parameters, predicates, and tasks
- **Detection of common modeling issues** like undefined entities, cyclic dependencies, and contradictory formulas

## Usage
The extension is automatically activated when you open `.hddl` files. Validation errors and warnings will appear in the editor.

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

## Codebase
Both the language server and the client are open-source, and publicly available through the following links:
- **Server**: [https://github.com/koala-planner/HDDL-Parser](https://github.com/koala-planner/HDDL-Parser)
- **VSCode Client**: [https://github.com/koala-planner/VSCode_HDDL](https://github.com/koala-planner/VSCode_HDDL)