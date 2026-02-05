# Boilerplate
Boilerplate code for creating frontend web projects.

+ [Clone the Repository](#clone-the-repository)
+ [Install](#install)

## Clone the Repository
It is recommended to clone to repository using the `SSH (Secure Shell)` protocol. This can be done using the terminal. `SSH` will need to be setup first.

```shell
$ git@github.com:hackdanismo/boilerplate.git
```

## Install
Once the repository has been cloned, any dependencies or packages will need to be installed. These will be listed in the `package.json` file.

```shell
$ cd boilerplate
$ npm install
```

It is worth also setting the recommended `Node` version. The `.nvmrc` configuration file sets the recommended `Node` version. `Node Version Manager (NVM)` needs to be installed. To apply the correct `Node` version:

```shell
$ nvm use
```

## Development
Any changes to the code base will require the `dev` script to be run. This will compile the `TypeScript` files in the `src` directory to `JavaScript` files inside the `dist` directory:

```shell
$ cd boilerplate
# Set the Node version specified in the .nvmrc config file
$ nvm use
# Run the development script
$ npm run dev
```

As the `index.html` document uses a `module` to include the `JavaScript` code, a local server must be used. `Python` can be used as a local server. The `HTML` document can then be viewed on: [http://localhost:8000/](http://localhost:8000/).

Here is the command to start the server in the terminal:

```shell
$ python3 -m http.server
```