# Network Manager (nmanager)

![NPM Downloads](https://img.shields.io/npm/dm/nmanager)
![GitHub License](https://img.shields.io/github/license/SirMarkus73/network-manager)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/SirMarkus73/network-manager/deploy.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A cross-platform CLI to configure, monitor, and troubleshoot network connections on Linux (Windows support planned). 🛠️

## Contents
- [Network Manager (nmanager)](#network-manager-nmanager)
  - [Contents](#contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Changelog](#changelog)

## Features

- 🖥️ Cross-platform design: Linux today, Windows support planned
- 🧭 User-friendly interface for managing network settings

## Installation

```bash
pnpm i nmanager -g
```

## Usage

ℹ️ Show available commands and options:
```bash
nmanager
nmanager --help
```

🧭 List all commands and subcommands:
```bash
nmanager --commands
```

## Contributing

🤝 Contributions are welcome! Fork the repository and open a pull request.

We use [Commitizen](https://github.com/commitizen/cz-cli) to format commit messages and keep a consistent, conventional commit history (this helps with changelogs and releases).

Please use Commitizen when creating commits. Make sure to run Commitizen commands from the project root directory. Install and run it using one of the options below:

```bash
# Install globally
pnpm install -g commitizen
```

Then, to create a commit:

```bash
pnpm commit
# or
git cz
# or
pnpx cz
```

Thanks for following the project's commit conventions — it makes releases and changelogs much smoother.

## License

📝 Network Manager (nmanager) is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog

See the full changelog in the [CHANGELOG.md](CHANGELOG.md) file.
