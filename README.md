# Cryptomons

Cryptomons is a Vue 3 application with TypeScript, Pinia for state management, and Vue Router for navigation.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Grrraou/cryptomons.git
    ```

2. Navigate into the project directory:
    ```bash
    cd cryptomons
    ```

3. Install dependencies:
    ```bash
    yarn install
    ```

## Development

To run the project in development mode:

    ```bash
    yarn dev
    ```


 ## Docker
    ```bash
    docker build -t cryptomons .
    docker run -d -p 80:80 --name cryptomons --memory=128m --cpus="0.5" cryptomons
    ```

http://localhost/5173



