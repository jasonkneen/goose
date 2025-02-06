<h1 align="center">
codename goose
</h1>

<p align="center">
  <strong>an open-source, extensible AI agent that goes beyond code suggestions<br>install, execute, edit, and test with any LLM</strong>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg">
  </a>
  <a href="https://discord.gg/7GaTvbDwga">
    <img src="https://img.shields.io/discord/1287729918100246654?logo=discord&logoColor=white&label=Join+Us&color=blueviolet" alt="Discord">
  </a>
  <a href="https://github.com/block/goose/actions/workflows/ci.yml">
     <img src="https://img.shields.io/github/actions/workflow/status/block/goose/ci.yml?branch=main" alt="CI">
  </a>
</p>

Check out our [documentation](https://block.github.io/goose), or to try it out head to the [installation](https://block.github.io/goose/docs/getting-started/installation) instructions!

## Using the Goose Docker Image

You can now use the official Goose Docker image to run Goose in a containerized environment. Follow the instructions below to build and run the Goose Docker image.

### Building the Docker Image

To build the Goose Docker image, run the following command in the root directory of the repository:

```sh
docker build -t goose:latest .
```

### Running the Docker Image

To run the Goose Docker image, use the following command:

```sh
docker run --rm -it goose:latest
```

This will start the Goose CLI in an interactive terminal session.

You can also pass additional arguments to the Goose CLI by appending them to the `docker run` command. For example, to run a specific Goose command, use:

```sh
docker run --rm -it goose:latest <command>
```

Replace `<command>` with the desired Goose command and its arguments.
