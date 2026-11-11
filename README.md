A Visual Studio Code extension that brings [HDDL Parser](https://github.com/koala-planner/HDDL-Parser) into the editor. It validates planning models specified in the Hierarchical Domain Definition Language (HDDL)[^1] while you edit them. Errors are reported in place, with actionable messages and exact locations, to help domain modelers catch bugs early.

The extension is a thin client. All analysis is done by the HDDL Parser language server, which ships with the extension and talks to the editor through the Language Server Protocol (LSP).

# Features
* **Real-time Validation**: Domain and problem files are checked while you edit, with no separate command to run.
* **Error Localization**: Each error is underlined at its exact location and listed in the Problems panel.
* **Syntax Highlighting**: Keywords, variables, types, and comments in `.hddl` files.
* **Editing Support**: `;` line comments, plus matching and auto-closing of parentheses.
* **No Setup**: The language server is bundled, so there is nothing else to install.

# Detected Errors
In what follows, we provide the currently supported list of errors (for further details, see the paper by Sleath and Bercher (2023)[^2]).
* **Basic Syntax Issues**: Detects deviations from the HDDL grammar.
* **Inconsistent Parameter Usage**: Catches type mismatches and incorrect parameter counts in task/predicate/function usage.
* **Undefined Entities**: Identifies undefined predicates, functions, types, objects, and tasks.
* **Duplicate Definitions**: Finds duplicate tasks, methods, predicates, functions, and constants.
* **Cyclic Type Declarations**: Identifies cycles in the type hierarchy.
* **Undeclared Parameters**: Catches use of parameters not declared in tasks or methods.
* **Task Network Issues**: Detects cyclic ordering declaration.
* **Unrefinable Tasks**: Flags compound tasks that do not have a primitive refinement.

# Installation
Install **HDDL Parser** from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=KoalaHTNPlanning.hddl-parser), or search for "HDDL Parser" in the Extensions view of VS Code. Alternatively, run the following in a terminal:

```
code --install-extension KoalaHTNPlanning.hddl-parser
```

The extension requires VS Code 1.100 or newer. A language server is bundled for the following platforms:

| Platform | Architecture          | Status            |
|----------|-----------------------|-------------------|
| Linux    | x64                   | Supported         |
| macOS    | arm64 (Apple Silicon) | Supported         |
| Windows  | x64                   | Not yet available |

On any other platform, the language server has to be built from source; see [Language Server Binaries](#language-server-binaries).

# Usage
Open any `.hddl` file. The extension activates automatically, starts the language server, and reports errors both in the editor and in the Problems panel. Only files saved on disk are validated.

The server's messages and the full LSP trace are written to the "HDDL Language Server" channel of the Output panel, which is the first place to look if no errors are being reported.
\
# Related Repositories
* **Language Server and Command Line Tool**: [https://github.com/koala-planner/HDDL-Parser](https://github.com/koala-planner/HDDL-Parser)
* **VS Code Client** (this repository): [https://github.com/koala-planner/VSCode_HDDL](https://github.com/koala-planner/VSCode_HDDL)

# Feedback
We welcome contributions and feedback from the planning community. If you have spotted any bugs, please report them using this repository's "Issues" tab. Problems with the reported errors themselves (e.g., a valid model being rejected) are best reported to the [HDDL Parser](https://github.com/koala-planner/HDDL-Parser) repository. Alternatively, you can email
- Mohammad Yousefi (<a href="mailto:mohammad.yousefi@anu.edu.au">mohammad.yousefi@anu.edu.au</a>) for technical enquiries, or
- Pascal Bercher (<a href="mailto:pascal.bercher@anu.edu.au">pascal.bercher@anu.edu.au</a>) for other purposes.

# License
This project is released under the PolyForm Noncommercial License 1.0.0. See the [LICENSE](LICENSE) file for the full text.

# Citation

If you use HDDL Parser in your research, please cite:

```bibtex
@inproceedings{yousefi2025hddlparser,
  author    = {Yousefi, Mohammad and Bercher, Pascal},
  title     = {{HDDL Parser}: A Realtime Hierarchical Planning Language Validation Toolkit},
  booktitle = {ICAPS 2025 Demonstrations},
  address   = {Melbourne, Australia},
  year      = {2025},
  url       = {https://icaps25.icaps-conference.org/program/demos-pdfs/ICAPS25-Demo_paper_2.pdf}
}
```

[^1]: Höller, Daniel, Gregor Behnke, Pascal Bercher, Susanne Biundo, Humbert Fiorino, Damien Pellier, and Ron Alford. "HDDL: An Extension to PDDL for Expressing Hierarchical Planning Problems". In Proceedings of the 34th Association for the Advancement of Artificial Intelligence (AAAI) Conference, 9883–9891. AAAI Press, 2020.

[^2]: Sleath, Kayleigh, and Pascal Bercher. "Detecting AI Planning Modelling Mistakes -- Potential Errors and Benchmark Domains". In Proceedings of the 20th Pacific Rim International Conference on Artificial Intelligence (PRICAI), 448–454. Springer, 2023.
