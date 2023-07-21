<script setup>
  import constants from "../../src/versions/constants.js";
  import arabicaVersions from "../../src/versions/arabica_versions.js";
  import mochaVersions from "../../src/versions/mocha_versions.js";
  import blockspaceraceVersions from "../../src/versions/blockspacerace_versions.js";
  import { InstallCelestiaNode, ConnectCelestiaNode } from "../../src/components/CelestiaNode.jsx";
</script>

<h1> Celestia Node RPC CLI 教程 </h1>

在本教程中，我们将介绍如何使用 Celestia Node RPC API 通过命名空间提交和检索数据（blob）到数据可用性层。

::: tip 🔔
要查看 Celestia 轻节点的视频教程，请点击[这里](./light-node-video.md)。
:::
::: warning ⚠️
Gateway API 已被弃用，并将在未来移除。如果您仍希望使用它们，可以在[这里](https://github.com/celestiaorg/celestia-node/pull/2360)找到更多细节。
:::

<h2> 目录 </h2>

本教程分为以下几个部分：

- [简介](#简介)
  - [Blobs](#blobs)
  - [命名空间](#命名空间)
- [硬件要求](#硬件要求)
- [安装依赖项](#安装依赖项)
  - [安装 Golang](#安装-golang)
- [Celestia 节点](#celestia-节点)
  - [安装 Celestia 节点](#安装-celestia-节点)
  - [实例化 Celestia 轻节点](#实例化-celestia-轻节点)
  - [连接到公共的接入点](#连接到公共的接入点)
  - [密钥及钱包](#密钥及钱包)
- [RPC 命令行教程](#rpc-命令行教程)
  - [安装](#安装)
  - [提交数据](#提交数据)
  - [检索数据](#检索数据)
  - [示例](#示例)
  - [更多示例](#更多示例)
- [其他资源](#其他资源)
  - [发布一个 SVG 作为 PFB](#发布一个-svg-作为-pfb)
  - [Golang 教程](#golang-教程)
  - [疑难解答](#疑难解答)

## 简介

### Blobs

通过向核心网络发送 `MsgPayForBlobs` 交易来提交`Data`到 Celestia 的 DA 层。详细了解 `MsgPayForBlobs` 交易请点击[此处](https://github.com/celestiaorg/celestia-app/blob/main/x/blob/README.md#messages)。

### 命名空间

Celestia 将区块数据分割成多个命名空间，每个应用程序对应一个命名空间。这使得应用程序只需下载自己的数据，而无需下载其他应用程序的数据。详细了解命名空间 Merkle 树（NMTs）请点击[此处](https://docs.celestia.org/concepts/how-celestia-works/data-availability-layer/#namespaced-merkle-trees-nmts)。

## 硬件要求

以下是运行轻节点所推荐的最低硬件要求：

- 内存: **2 GB**
- CPU: **单核**
- 硬盘: **25 GB SSD 存储**
- 带宽: **56 Kbps 上下行**

## 安装依赖项

首先，请确保更新和升级操作系统：

<tabs>

<tab name="APT">

```shell
sudo apt update && sudo apt upgrade -y
```

</tab>

<tab name="YUM">

```shell
sudo yum update
```

</tab>

</tabs>

以下是执行许多任务（如下载文件、编译和监控节点）所必需的基本软件包：
<tabs>

<tab name="APT">

```shell
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
```

</tab>

<tab name="YUM">

```shell
sudo yum install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
```

</tab>

<tab name="Mac (Apple/Intel芯片)">

<h3> 🍺 安装 Homebrew（如已安装可跳过这一步） </h3>

`Homebrew` 是适用于 `macOS` 和 `Linux` 的软件包管理器，它可以让您安装所需的依赖项。

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

请确保运行的命令与下面输出类似：

```shell
==> Next steps:
- Run these three commands in your terminal to add Homebrew to your PATH:
    echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/joshstein/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/joshstein/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

<h3> 🗄 安装 wget 和 jq </h3>

```shell
brew install wget && brew install jq
```

`wget` 是一个用于从互联网上检索文件的工具，而 `jq` 则是一个轻量级的命令行 `JSON` 处理器。
</tab>

</tabs>

### 安装 Golang

`celestia-app` 和 `celestia-node` 是用 `Golang` 编写的，因此我们必须安装 `Golang` 才能编译和运行它们。

<tabs>

<tab name="Ubuntu(AMD)">

```shell

ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"

```

</tab>

<tab name="Ubuntu(ARM)">

```shell
ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-arm64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-arm64.tar.gz"
rm "go$ver.linux-arm64.tar.gz"
```

</tab>

<tab name="Mac(Apple)">

```shell
ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.darwin-arm64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.darwin-arm64.tar.gz"
rm "go$ver.darwin-arm64.tar.gz"
```

</tab>

<tab name="Mac(Intel)">

```shell
ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.darwin-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.darwin-amd64.tar.gz"
rm "go$ver.darwin-amd64.tar.gz"
```

</tab>
</tabs>

现在我们需要将 `/usr/local/go/bin` 目录添加到 `$PATH` 环境变量中：

<tabs>
<tab name="bash">

```shell
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

</tab>
<tab name="zsh">

```shell
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.zshrc
source $HOME/.zshrc

```

</tab>
</tabs>

要检查 Go 是否正确安装，请运行以下命令：

```shell
go version
```

如果已安装输出应该是：
<tabs>
<tab name="Ubuntu(AMD)">

```shell
go version go1.20.2 linux/amd64
```

</tab>
<tab name="Ubuntu(ARM)">

```shell
go version go1.20.2 linux/amd64
```

</tab>
<tab name="Mac(Apple)">

```shell
go version go1.20.2 darwin/arm64
```

</tab>
<tab name="Mac(Intel)">

```shell
go version go1.20.2 darwin/amd64
```

</tab>

</tabs>

## Celestia 节点

### 安装 Celestia 节点

<tabs>
<tab name="Blockspace Race" :value="cnsumi">

<tabs>
<tab name="Ubuntu(AMD/ARM)">

<InstallCelestiaNode networkName="Blockspace Race" platform="ubuntu"/>
</tab>
<tab name="Mac(Apple/Intel)">

<InstallCelestiaNode networkName="Blockspace Race" platform="apple"/>
</tab>
</tabs>
</tab>

<tab name="Mocha">

<tabs>
<tab name="Ubuntu(AMD/ARM)">

<InstallCelestiaNode networkName="Mocha" platform="ubuntu"/>
</tab>
<tab name="Mac(Apple/Intel)">

<InstallCelestiaNode networkName="Mocha" platform="apple"/>
</tab>
</tabs>
</tab>

<tab name="Arabica">

<tabs>
<tab name="Ubuntu(AMD/ARM)">

<InstallCelestiaNode networkName="Arabica" platform="ubuntu"/>
</tab>
<tab name="Mac(Apple/Intel)">

<InstallCelestiaNode networkName="Arabica" platform="apple"/>
</tab>
</tabs>
</tab>
</tabs>

通过运行`celestia version`命令检查版本，验证二进制文件是否正常工作：

```shell
$ celestia version
Semantic version: v0.10.4
Commit: 03ff94a7d779caf1225f3dccb53a68e8f1646dc6
Build Date: Thu Dec 15 10:19:22 PM UTC 2022
System version: amd64/linux
Golang version: go1.20.2
```

### 实例化 Celestia 轻节点

现在，让我们实例化一个 Celestia 轻节点：

> 注意：RPC 接入点在所有 `celestia-node` 类型（如轻节点、桥接节点和完整节点）中都是可用的。

<tabs>
<tab name="Blockspace Race">

```shell
celestia light init --p2p.network blockspacerace
```

</tab>
<tab name="Mocha">

```shell
celestia light init
```

</tab>
<tab name="Arabica 🏗️">

```shell
celestia light init --p2p.network arabica
```

</tab>
</tabs>

### 连接到公共的接入点

<tabs>
<tab name="Blockspace Race">

<ConnectCelestiaNode />
```shell
celestia light start --core.ip <ip-address> --p2p.network blockspacerace
```
</tab>
<tab name="Mocha">

<ConnectCelestiaNode />
```shell
celestia light start --core.ip <ip-address> --p2p.network mocha
```
</tab>
<tab name="Arabica 🏗️">

<ConnectCelestiaNode />
```shell
celestia light start --core.ip <ip-address> --p2p.network arabica
```
</tab>
</tabs>

:::tip 🔔

`--core.ip`的 gRPC 端口默认为 9090，因此如果您在命令行中不指定它，它将默认使用该端口。您可以在 IP 地址后添加端口，或者使用`--core.grpc.port`标志来指定其他端口。

有关所需开放哪些端口的信息，请参阅“[ports](https://docs.celestia.org/nodes/celestia-node/#ports)”部分。
:::

例如，您的命令连同一个 RPC 接入点可能如下所示：
<tabs>
<tab name="Blockspace Race">

```shell
celestia light start --core.ip <ip-address> --p2p.network blockspacerace
```

</tab>
<tab name="Mocha">

```shell
celestia light start --core.ip rpc-mocha.pops.one --p2p.network mocha
```

</tab>
<tab name="Arabica 🏗️">

```shell
celestia light start --core.ip consensus-full-arabica-9.celestia-arabica.com --p2p.network arabica
```

</tab>
</tabs>

### 密钥及钱包

## RPC 命令行教程

### 安装

### 提交数据

### 检索数据

### 示例

### 更多示例

## 其他资源

### 发布一个 SVG 作为 PFB

### Golang 教程

### 疑难解答

```

```
