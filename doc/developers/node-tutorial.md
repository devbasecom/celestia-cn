<script setup>
  import constants from "../../src/versions/constants.js";
  import arabicaVersions from "../../src/versions/arabica_versions.js";
  import mochaVersions from "../../src/versions/mocha_versions.js";
  import blockspaceraceVersions from "../../src/versions/blockspacerace_versions.js";
  import { InstallCelestiaNode, ConnectCelestiaNode } from "../../src/components/CelestiaNode.jsx";
  import NetworkTab from "../../src/components/NetworkTab.vue";
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
    - [认证令牌 🔒](#认证令牌-)
    - [接入点](#接入点)
    - [自动补全](#自动补全)
  - [提交数据](#提交数据)
  - [检索数据](#检索数据)
  - [示例](#示例)
    - [检查余额](#检查余额)
    - [检查其他账户的余额](#检查其他账户的余额)
    - [获取你的节点 ID](#获取你的节点-id)
    - [获取你的账户地址](#获取你的账户地址)
    - [获取指定高度的区块头](#获取指定高度的区块头)
  - [更多示例](#更多示例)
    - [查询节点信息](#查询节点信息)
    - [获取数据可用性采样相关的统计](#获取数据可用性采样相关的统计)
    - [转账到其他账户](#转账到其他账户)
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

```sh
sudo apt update && sudo apt upgrade -y
```

</tab>

<tab name="YUM">

```sh
sudo yum update
```

</tab>

</tabs>

以下是执行许多任务（如下载文件、编译和监控节点）所必需的基本软件包：
<tabs>

<tab name="APT">

```sh
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
```

</tab>

<tab name="YUM">

```sh
sudo yum install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
```

</tab>

<tab name="Mac (Apple/Intel芯片)">

<h3> 🍺 安装 Homebrew（如已安装可跳过这一步） </h3>

`Homebrew` 是适用于 `macOS` 和 `Linux` 的软件包管理器，它可以让您安装所需的依赖项。

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

请确保运行的命令与下面输出类似：

```sh
==> Next steps:
- Run these three commands in your terminal to add Homebrew to your PATH:
    echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/joshstein/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shenv)"' >> /Users/joshstein/.zprofile
    eval "$(/opt/homebrew/bin/brew shenv)"
```

<h3> 🗄 安装 wget 和 jq </h3>

```sh
brew install wget && brew install jq
```

`wget` 是一个用于从互联网上检索文件的工具，而 `jq` 则是一个轻量级的命令行 `JSON` 处理器。
</tab>

</tabs>

### 安装 Golang

`celestia-app` 和 `celestia-node` 是用 `Golang` 编写的，因此我们必须安装 `Golang` 才能编译和运行它们。

<tabs>

<tab name="Ubuntu(AMD)">

```sh

ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"

```

</tab>

<tab name="Ubuntu(ARM)">

```sh
ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-arm64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-arm64.tar.gz"
rm "go$ver.linux-arm64.tar.gz"
```

</tab>

<tab name="Mac(Apple)">

```sh
ver="1.20.2"
cd $HOME
wget "https://golang.org/dl/go$ver.darwin-arm64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.darwin-arm64.tar.gz"
rm "go$ver.darwin-arm64.tar.gz"
```

</tab>

<tab name="Mac(Intel)">

```sh
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

```sh
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

</tab>
<tab name="zsh">

```sh
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.zshrc
source $HOME/.zshrc

```

</tab>
</tabs>

要检查 Go 是否正确安装，请运行以下命令：

```sh
go version
```

如果已安装输出应该是：
<tabs>
<tab name="Ubuntu(AMD/ARM)">

```sh
go version go1.20.2 linux/amd64
```

</tab>
<tab name="Ubuntu(ARM)">

```sh
go version go1.20.2 linux/arm64
```

</tab>
<tab name="Mac(Apple)">

```sh
go version go1.20.2 darwin/arm64
```

</tab>
<tab name="Mac(Intel)">

```sh
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

```sh
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

```sh
celestia light init --p2p.network blockspacerace
```

</tab>
<tab name="Mocha">

```sh
celestia light init
```

</tab>
<tab name="Arabica 🏗️">

```sh
celestia light init --p2p.network arabica
```

</tab>
</tabs>

### 连接到公共的接入点

<tabs>
<tab name="Blockspace Race">

<ConnectCelestiaNode />
```sh
celestia light start --core.ip <ip-address> --p2p.network blockspacerace
```
</tab>
<tab name="Mocha">

<ConnectCelestiaNode />
```sh
celestia light start --core.ip <ip-address> --p2p.network mocha
```
</tab>
<tab name="Arabica 🏗️">

<ConnectCelestiaNode />
```sh
celestia light start --core.ip <ip-address> --p2p.network arabica
```
</tab>
</tabs>

:::tip 🔔

`--core.ip`的 gRPC 端口默认为 9090，因此如果您在命令行中不指定它，它将默认使用该端口。您可以在 IP 地址后添加端口，或者使用`--core.grpc.port`标志来指定其他端口。

有关所需开放哪些端口的信息，请参阅“[ports](https://docs.celestia.org/nodes/celestia-node/#ports)”部分。
:::

例如，您的命令连同一个 RPC 接入点可能如下所示：

<NetworkTab :networks="constants.allNetwork">

<template #[constants.networkBlockspaceRace.name]>

```sh
celestia light start --core.ip <ip-address> --p2p.network blockspacerace
```

</template>

<template #[constants.networkMocha.name]>

```sh
celestia light start --core.ip rpc-mocha.pops.one --p2p.network mocha
```

</template>

<template #[constants.networkArabica.name]>

```sh
celestia light start --core.ip consensus-full-arabica-9.celestia-arabica.com --p2p.network arabica
```

</template>

</NetworkTab>

### 密钥及钱包

你可以通过运行以下命令为你的节点创建自己的密钥：

```sh
./cel-key add <key_name> --keyring-backend test --node.type light --p2p.network <network>
```

你可以通过运行以下命令使用上面创建的密钥启动你的轻节点：

<NetworkTab :networks="constants.allNetwork">

<template #[constants.networkBlockspaceRace.name]>

```sh
celestia light start --core.ip <ip-address> --keyring.accname <key_name> <port> --p2p.network blockspacerace
```

</template>

<template #[constants.networkMocha.name]>

```sh
celestia light start --core.ip <ip-address> --keyring.accname <key_name> --p2p.network mocha
```

</template>

<template #[constants.networkArabica.name]>

```sh
celestia light start --core.ip <ip-address> --keyring.accname <key_name> --p2p.network arabica
```

</template>

</NetworkTab>

::: tip

请参考 "[ports](<[ports](https://docs.celestia.org/nodes/celestia-node/#ports)>)" 部分以了解在您的机器上需要打开哪些端口。
:::

一旦启动了轻节点，将会自动生成一个钱包密钥。您需要用 Mocha Testnet 或 Arabica Devnet 代币为该地址充值，以支付`PayForBlob`交易的费用。

你可以通过在`celestia-node`目录中运行以下命令来找到该地址：

```sh
./cel-key list --node.type light --keyring-backend test --p2p.network <network>
```

如果你想用测试网代币充值你的钱包，请前往 [Celestia Discord](https://discord.gg/celestiacommunity)的`#mocha-faucet`或`#arabica-faucet`频道。

你可以在 Discord 中使用以下命令向你的钱包地址请求代币：

```sh
$request <Wallet-Address>
```

`<Wallet-Address>` 是在创建钱包时生成的类似 `celestia1******` 的钱包地址。

一旦您的钱包获得了资金，您可以继续进行下一步操作。

## RPC 命令行教程

:::tip 🔔
“命令行”和“终端”这两个词语经常混用，但其表达的是同一个意思，即用来与操作系统交互的 OSX/Linux 下的终端窗口或 Windows 环境下的命令行应用(或其他类似的应用)。
:::

这部分教程将教你如何与 Celestia 节点的[RPC](https://node-rpc-docs.celestia.org/)（远程过程调用）API 进行交互。

首先，请先[安装和运行 celestia-node](#安装依赖项)，然后打开另一个终端窗口以开始查询 API。

Celestia 节点的命令行界面（CLI）有一个名为`rpc`的子命令，它允许你通过终端与节点的 RPC API 进行交互。

`rpc`子命令的格式如下：

```sh
celestia rpc [module] [method] [...args]
```

### 安装

#### 认证令牌 🔒

为了使用`rpc`子命令与 API 进行交互，你需要设置认证令牌。

`--auth TOKEN`参数用于设置认证令牌，否则它将从环境变量`CELESTIA_NODE_AUTH_TOKEN`中读取。如果找不到令牌，认证将不会被设置。如果没有设置认证，请求将失败。

要设置你的认证令牌，你可以使用以下命令。确保将`<node-type>`替换为节点的类型，将`<network>`替换为你运行节点的网络：

```sh
export CELESTIA_NODE_AUTH_TOKEN=$(celestia <node-type> auth admin --p2p.network <network>)
```

以下是在 Arabica 上设置你的轻节点认证令牌的示例：

```sh
export CELESTIA_NODE_AUTH_TOKEN=$(celestia light auth admin --p2p.network arabica)
```

#### 接入点

`--host URL`参数用于设置接入点地址，默认情况下是通过 HTTP 访问的`localhost:26658`。

#### 自动补全

如果你想为 Celestia Node CLI 的 `rpc` 子命令开启自动补全功能，你可以使用以下命令，并按照 CLI 中的说明进行操作。

```sh
# pick your sh type from the array
celestia completion [bash | fish | powersh | zsh]
```

如果你想查看你的 sh 的帮助菜单，可以运行以下命令：

```sh
# pick your sh type from the array
celestia completion [bash | fish | powersh | zsh] --help
```

### 提交数据

在这个示例中，我们将使用我们的轻节点提交一个`PayForBlob`交易。

需要考虑的一些事项：

- PFB 是一个 `PayForBlob` 消息。
- 接入点还需要提供 `namespace_id` 和 `data` 值。
- Namespace ID 应为 10 字节，以 `0x` 为前缀。
- Data 应为原始消息的十六进制编码字节。

我们使用以下数据来完成这个示例：

```sh
namespace_id: 0x42690c204d39600fddd3

data：0xf1f20ca8007e910a3bf8b2e61da0f26bca07ef78717a6ea54165f5
```

你也可以使用我们创建的[Golang Playground](https://go.dev/play/p/7ltvaj8lhRl) 来生成你自己的 `namespace_id` 和 `data`。

下面是 `PayForBlob` 交易的示例格式：

```sh
celestia rpc blob SubmitPayForBlob [namespace in hex] [data in hex]
```

我们运行以下命令以十六进制格式向网络提交一个`Blob`：

```sh
celestia rpc blob Submit 0x42690c204d39600fddd3 0xf1f20ca8007e910a3bf8b2e61da0f26bca07ef78717a6ea54165f5
```

输出

```json
{
  "jsonrpc": "2.0",
  "result": 32236,
  "id": 1
}
```

我们还可以使用文本字符串作为 `data`，它将被转换为 Base64 格式。以下是格式的示例：

```sh
celestia rpc blob Submit [namespace in hex] "'[data]'"
```

以下是以纯文本数据 "gm" 提交 `PayForBlob` 交易的示例：

```sh
celestia rpc blob Submit 0x42690c204d39600fddd3 '"gm"'
```

上面的输出返回了一个 `height` 为 `32236`，我们将在下一个命令中使用这个`height`。

注意：要了解更多关于状态响应代码的信息，请查阅 [`cosmos代码解释`](https://github.com/cosmos/cosmos-sdk/blob/main/types/errors/errors.go) 。

<b>`SubmitPayForBlob`参数</b>

通过 `rpc` 子命令，你可以使用 `SubmitPayForBlob` 方法将一个 `blob` 提交到网络中。

`SubmitPayForBlob` 的参数会进行特殊解析，以提高用户体验。

有几种方式可以提交`SubmitPayForBlob `：

- **Namespace ID** 可以被编码为十六进制或 Base64 格式。
- **Blob** 可以是十六进制（`0x...`）、Base64 格式（`"..."`）或普通字符串（将被编码为 Base64）（`'"Hello There!"'`）。

### 检索数据

在成功提交你的 PFB 交易后，节点将返回包含 PFB 交易的区块高度。你可以使用该区块高度和你提交 PFB 交易时使用的 Namespace ID，来获取返回给你的消息份额（数据）。在这个例子中，我们得到的区块高度是 32236，我们将在下面的命令中使用它。在 [Celestia 规范](https://node-rpc-docs.celestia.org/#share)中，可以阅读更多关于份额（shares）的信息。

以下是 `GetAll` 命令的使用格式：

```sh
celestia rpc blob GetAll [block height] [namespace in hex]
```

以下是在 `arabica-9` 节点上检索上述数据的示例命令：

```sh
celestia rpc blob GetAll 32236 0x42690c204d39600fddd3
```

输出如下

```json
{
  "jsonrpc": "2.0",
  "result": [
    {
      "namespace": "AAAAAAAAAAAAAAAAAAAAAAAAAAwgTTlgD93TAAA=",
      "data": "8fIMqAB+kQo7+LLmHaDya8oH73hxem6lQWX1",
      "share_version": 0,
      "commitment": "y0WFz9YPTAtkdv781IfcMO144qkdnAnjKnL9oJxkQ44="
    }
  ],
  "id": 1
}
```

这里的输出是经过 base64 编码过的。

要查看通过 cURL 发送的 JSON 请求，在发送请求时，使用 `-—print-request` 参数即可：

```sh
celestia rpc blob GetAll 32236 0x42690c204d39600fddd3 --print-request
```

输出如下

```json
{
  "Request": {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "blob.GetAll",
    "params": [32236, ["AAAAAAAAAAAAAAAAAAAAAAAAAAwgTTlgD93TAAA="]]
  },
  "Response": {
    "jsonrpc": "2.0",
    "result": [
      {
        "namespace": "AAAAAAAAAAAAAAAAAAAAAAAAAAwgTTlgD93TAAA=",
        "data": "8fIMqAB+kQo7+LLmHaDya8oH73hxem6lQWX1",
        "share_version": 0,
        "commitment": "y0WFz9YPTAtkdv781IfcMO144qkdnAnjKnL9oJxkQ44="
      }
    ],
    "id": 1
  }
}
```

类似的，你可以通过运行以下命令来使用 cURL 获取响应：

```sh
curl -X POST -H "Authorization: Bearer ${CELESTIA_NODE_AUTH_TOKEN}" \
   -H 'Content-Type: application/json' \
   -d '{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "blob.GetAll",
  "params": [
   32236,
   [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAwgTTlgD93TAAA="
   ]
  ]
 }' \
   http://localhost:26658
```

输出

```sh
{“jsonrpc”:“2.0",“result”:[{“namespace”:“AAAAAAAAAAAAAAAAAAAAAAAAAAwgTTlgD93TAAA=“,”data”:“8fIMqAB+kQo7+LLmHaDya8oH73hxem6lQWX1”,“share_version”:0,“commitment”:“y0WFz9YPTAtkdv781IfcMO144qkdnAnjKnL9oJxkQ44=“}],“id”:1}
```

### 示例

#### 检查余额

查询我们的节点以获取其默认账户的余额（默认账户与我们之前生成的`CELESTIA_NODE_AUTH_TOKEN`密钥相关联）：

```sh
celestia rpc state Balance
```

输出应与以下类似

```json
{
  "jsonrpc": "2.0",
  "result": {
    "denom": "utia",
    "amount": "79934811"
  },
  "id": 1
}
```

#### 检查其他账户的余额

以下是`BalanceForAddress`命令的示例格式：

```sh
celestia rpc state BalanceForAddress [address]
```

下面是通过节点检查其他地址余额的示例:

```sh
celestia rpc state BalanceForAddress celestia10rtd9lhel2cuh6c659l25yncl6atcyt37umard
```

输出如下

```json
{
  "jsonrpc": "2.0",
  "result": {
    "denom": "utia",
    "amount": "100000000"
  },
  "id": 1
}
```

#### 获取你的节点 ID

以下是用于获取你的节点 peerId 信息的 RPC 调用：

```sh
celestia rpc p2p Info
```

节点 ID 在响应中的 `ID` 值中：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "ID": "12D3KooWQHg8eo2DMjkw9WrNrhDq5Z7tPs32uMJkpj8njbGNF8kj",
    "Addrs": [
      "/ip4/10.0.0.171/tcp/2121",
      "/ip6/::1/tcp/2121",
      "/ip4/10.0.0.171/udp/2121/quic-v1",
      "/ip6/::1/udp/2121/quic-v1",
      "/ip4/71.200.65.106/tcp/54588",
      "/ip4/71.200.65.106/udp/54588/quic-v1"
    ]
  },
  "id": 1
}
```

#### 获取你的账户地址

以下是用于获取你的节点账户地址的 RPC 调用：

```sh
celestia rpc state AccountAddress
```

输出如下

```json
{
  "jsonrpc": "2.0",
  "result": "celestia182wascu47m2fsu6davhktsaledd4pukahs2dgs",
  "id": 1
}
```

#### 获取指定高度的区块头

以下是 `GetByHeight` 命令的示例格式：

```sh
celestia rpc header GetByHeight [height]
```

现在，让我们获取区块头信息。

这里我们将获取区块 `1` 的头信息：

输出如下

```json max-height=20
{
  "jsonrpc": "2.0",
  "result": {
    "header": {
      "version": {
        "block": "11",
        "app": "1"
      },
      "chain_id": "arabica-9",
      "height": "1",
      "time": "2023-05-30T15:06:21.9265Z",
      "last_block_id": {
        "hash": "",
        "parts": {
          "total": 0,
          "hash": ""
        }
      },
      "last_commit_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "data_hash": "3D96B7D238E7E0456F6AF8E7CDF0A67BD6CF9C2089ECB559C659DCAA1F880353",
      "validators_hash": "C4F7F08A8F3024A28D6486B4BA434B12391A29DFA8C04C74589A013A9A0BE427",
      "next_validators_hash": "C4F7F08A8F3024A28D6486B4BA434B12391A29DFA8C04C74589A013A9A0BE427",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "proposer_address": "7CD439E5F1A00E8594AA243CC9C4BFE1A6E7C397"
    },
    "validator_set": {
      "validators": [
        {
          "address": "7CD439E5F1A00E8594AA243CC9C4BFE1A6E7C397",
          "pub_key": {
            "type": "tendermint/PubKeyEd25519",
            "value": "oubutxNSyuD0XZNmMQSraHazmE2PjFsZVZ8RNHFX3WA="
          },
          "voting_power": "500000000",
          "proposer_priority": "0"
        }
      ],
      "proposer": {
        "address": "7CD439E5F1A00E8594AA243CC9C4BFE1A6E7C397",
        "pub_key": {
          "type": "tendermint/PubKeyEd25519",
          "value": "oubutxNSyuD0XZNmMQSraHazmE2PjFsZVZ8RNHFX3WA="
        },
        "voting_power": "500000000",
        "proposer_priority": "0"
      }
    },
    "commit": {
      "height": 1,
      "round": 0,
      "block_id": {
        "hash": "E5D620B5BE7873222DCD83464C285FD0F215C209393E7481F9A5979280AD6CA2",
        "parts": {
          "total": 1,
          "hash": "5BDD329766F3803594FA840D5B4860A82115AFA70CB307F28F7E84D3FE883A55"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "7CD439E5F1A00E8594AA243CC9C4BFE1A6E7C397",
          "timestamp": "2023-05-30T17:44:48.957739642Z",
          "signature": "vgp6mcStXsCN5OmmqtPJCReoSu47bRcysDphTbXjqq4FuR876dwMD0fu/8lyrrpLBSt3vMAA0bTQ0GggXh6VAw=="
        }
      ]
    },
    "dah": {
      "row_roots": [
        "//////////////////////////////////////7//////////////////////////////////////huZWOTTDmD36N1F75A9BshxNlRasCnNpQiWqIhdVHcU",
        "/////////////////////////////////////////////////////////////////////////////5iieeroHBMfF+sER3JpvROIeEJZjbY+TRE0ntADQLL3"
      ],
      "column_roots": [
        "//////////////////////////////////////7//////////////////////////////////////huZWOTTDmD36N1F75A9BshxNlRasCnNpQiWqIhdVHcU",
        "/////////////////////////////////////////////////////////////////////////////5iieeroHBMfF+sER3JpvROIeEJZjbY+TRE0ntADQLL3"
      ]
    }
  },
  "id": 1
}
```

### 更多示例

#### 查询节点信息

```sh
celestia rpc node Info
```

#### 获取数据可用性采样相关的统计

```sh
celestia rpc das SamplingStats
```

#### 转账到其他账户

根据你的需求转移指定数量的代币，并设置接收方地址、燃料费用和燃料限制。格式如下：

```sh
celestia rpc state Transfer $TO_ADDRESS [amount in utia] [gas fee in utia] [gas fee in utia]
```

这是一个样例，用来发送 `0.1 TIA` 到`celestia1c425ckmve2489atttx022qpc02gxspa29wmh0d`，`gasFee` 为 `0.008TIA`，`gasLimit` 为 `0.08TIA`

```sh
export $ADDRESS='celestia1c425ckmve2489atttx022qpc02gxspa29wmh0d'

celestia rpc state Transfer $ADDRESS 100000 8000 80000
```

可以通过`jq`获取交易哈希

```sh
celestia rpc state Transfer $ADDRESS 100000 8000 80000 | jq .result.txhash
```

## 其他资源

### 发布一个 SVG 作为 PFB

如果你想创建自己的 SVG 图像，将其上传到 Celestia，并检索它，你可以查看 [Base64 SVG 教程](https://based64.xyz/)。

### Golang 教程

如果你有兴趣使用 Go 语言与节点的 API 进行交互（`client.go`），你可以使用 [`da-rpc-client-tutorial`](https://github.com/renaynay/da-rpc-client-tutorial)。

### 疑难解答

:::tip 💡
如果你碰到了类似的错误

```sh
"rpc error: code = NotFound desc = account celestia1krkle0n547u0znz3unnln8paft2dq4z3rznv86 not found"
```

有可能你正在尝试从某个账户提交 `PayForBlob` 交易，但该账户尚未获得测试网代币。请确保测试网水龙头（testnet faucet）已向你的账户提供了代币，然后再次尝试提交交易
:::
