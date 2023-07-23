<h1>Prompt scavenger</h1>

欢迎来到`Prompt Scavenger`的世界，这是一个游戏，你将使用`Celestia Node API`和`OpenAI GPT-3.5 `来解码散落在 Celestia 区块链中的隐藏信息。在本教程中，我们将使用 Golang 来编写游戏的代码。

通过这个教程，你将获得使用 `Celestia Node API` 从区块链中获取数据、处理数据并提交新交易的经验。你还将学习如何集成 `OpenAI GPT-3.5 API`，根据你找到的数据生成有趣的回复。

如果你准备好开始一段将区块链技术与人工智能的强大能力相结合的冒险之旅，并在过程中学习一些 Golang，那么让我们开始吧！

## 依赖项

需要安装或获取以下依赖项：

- Golang
- Celestia 轻节点
- OpenAI GPT3.5 的 API Key

### 安装 Golang

参考[这里](./node-tutorial.md#安装-golang)

### 安装 Celestia 节点并且运行轻节点

#### 安装 Celestia 节点

参考[这里](./node-tutorial.md#安装-celestia-节点)

#### 设置环境变量

```sh
KEYNAME="scavenger_key"
NODETYPE="light"
NETWORK="blockspacerace"
AUTHTYPE="admin"
CORE_IP=""
```

::: tip 💡
`CORE_IP`可以从[可用 RPC 端点列表](https://docs.celestia.org/nodes/blockspace-race/#rpc-endpoints)获得

:::

首先为轻节点生成一个钱包

```sh
./cel-key add $KEYNAME --keyring-backend test --node.type $NODETYPE --p2p.network $NETWORK
```

请务必将助记词和你的 `celestia1****` 地址保存在安全的地方。

然后，请前往我们的 Discord 服务器，在 Blockspace Race 的 `#faucet` 频道中请求代币。

你可以在 [`Interchain Explorer by Cosmostation`](https://testnet.mintscan.io/celestia-incentivized-testnet) 上跟踪你收到的代币。只需粘贴你的`celestia1****` 地址即可查找相应的信息。

我们将使用 Blockspace Race 测试网络运行这个版本的 Celestia 节点。首先，初始化我们的节点：

```sh
celestia light init --p2p.network blockspacerace
```

然后，启动我们的节点：

```sh
celestia light start --core.ip $CORE_IP --p2p.network $NETWORK --gateway.deprecated-endpoints --gateway --gateway.addr 127.0.0.1 --gateway.port 26659 --keyring.accname $KEYNAME
```

::: tip 💡 提示
`--core.ip` gRPC 端口默认为 9090，因此如果在命令行中未指定该端口，它将默认为 9090。你可以在 IP 地址后添加端口，或者使用 `--core.grpc.port` 标志来指定另一个端口，如果你更喜欢的话。

请查阅[`ports`](../nodes/celestia-node.md#ports)部分以了解在你的计算机上需要打开哪些端口的信息。
:::

现在你的计算机上应该已经有一个正在运行的轻节点。接下来的教程将假设你会在本地构建和运行脚本。

### Node API 认证密钥

在运行轻节点的机器上运行以下命令:

```sh
export AUTH_TOKEN=$(celestia $NODETYPE auth $AUTHTYPE)

echo $AUTH_TOKEN
```

这将用于我们稍后设置的环境变量文件。

### OpenAI Key

请确保前往 [OpenAI](https://openai.com/)注册一个账户，并生成 OpenAI API Key 以请求其 API 服务。

## 开发 Prompt Scavenger

创建一个`.env`文件并且将下列内容粘贴进去：

```sh
NODE_RPC_IP="http://localhost:26658"
NODE_JWT_TOKEN=""
OPENAI_KEY=""
NAMESPACE_ID="00000000ce1e571a"
```

`OPENAI_KEY` 是你从 OpenAI 获得的 API Key。对于 `NODE_RPC_IP`，假设它是本地主机，但它也可以指向远程的轻节点。`NODE_JWT_TOKEN` 是你之前生成的身份验证令牌（AUTH_TOKEN）。对于 Namespace ID，我们为你提供了一个示例，但你也可以生成自己的。

现在，让我们开始构建吧！

### 复制 Go 文件

运行下列命令

```sh
mkdir test_scavenger
git clone https://github.com/celestiaorg/PromptScavenger.git
cp PromptScavenger/go.mod test_scavenger/
cp PromptScavenger/go.sum test_scavenger/
cd test_scavenger
```

这将把所需的 `go.sum` 和 `go.mod` 文件复制到一个新目录中，我们将在该目录中导入 Node API 的 Golang 库。

### 编写 import 内容

在目录内创建一个`main.go`文件, 并引入所需的库：

```go
package main

import (
        "context"
        "fmt"
        "log"
        "os"

        "github.com/celestiaorg/celestia-node/api/rpc/client"
        nodeheader "github.com/celestiaorg/celestia-node/header"
        "github.com/celestiaorg/nmt/namespace"
        "github.com/joho/godotenv"
        cosmosmath "cosmossdk.io/math"
        openai "github.com/sashabaranov/go-openai"
        "encoding/base64"
        "encoding/hex"
)

func main() {
  // TODO
}
```

在这里，我们设置了所有需要使用的必需库，以及用于游戏的`main`函数。

### 一些有用的函数

首先，我们需要创建一些函数，这些函数在后面的过程中会用到。

```go
// loadEnv loads environment variables from the .env file.
func loadEnv() {
        err := godotenv.Load(".env")
        if err != nil {
                log.Fatal("Error loading .env file")
        }
}
```

`loadEnv `函数允许我们加载`.env`文件，其中包含了所有必要的环境变量。

接下来，让我们创建另一个辅助函数，它可以根据传递给它的正确环境变量来加载 Celestia 节点客户端的实例

```go
// createClient initializes a new Celestia node client.
func createClient(ctx context.Context) *client.Client {
        nodeRPCIP := os.Getenv("NODE_RPC_IP")
        jwtToken := os.Getenv("NODE_JWT_TOKEN")

        rpc, err := client.NewClient(ctx, nodeRPCIP, jwtToken)
        if err != nil {
                log.Fatalf("Error creating client: %v", err)
        }

        return rpc
}
```

正如你所看到的，这里的 `Celestia Node Client`接收之前设置的 `Node RPC IP` 和 `JWT Token`。

现在，如果我们回到我们的`main`函数，我们可以按照以下步骤来设置和加载我们的环境变量和客户端：

```go
func main() {
  ctx, cancel := context.WithCancel(context.Background())
  defer cancel()
  loadEnv()

  // Close the client when you are finished
  client.Close()
}
```

在这里，我们设置了一个工作流程，允许我们加载环境变量、使用它实例化客户端，然后关闭客户端。

现在，让我们构建一些更多有用的函数：

```go
func createNamespaceID() []byte {
        nIDString := os.Getenv("NAMESPACE_ID")
        data, err := hex.DecodeString(nIDString)
        if err != nil {
                log.Fatalf("Error decoding hex string:", err)
        }
        // Encode the byte array in Base64
        base64Str := base64.StdEncoding.EncodeToString(data)
        namespaceID, err := base64.StdEncoding.DecodeString(base64Str)
        if err != nil {
                log.Fatalf("Error decoding Base64 string:", err)
        }
        return namespaceID
}
```

在这里，我们正在创建一个名为`createNameSpaceID`的函数。给定一个字符串作为`namespace ID`，它可以将十六进制字符串解码为字节数组，然后再将其编码为 base64 字符串，这是 Node API 所需的格式。

在我们结束之前，我们还需要创建几个函数。

```go
// postDataAndGetHeight submits a new transaction with the
// provided data to the Celestia node.
func postDataAndGetHeight(client *client.Client, namespaceID namespace.ID, payLoad [
]byte, fee cosmosmath.Int, gasLimit uint64) uint64 {
        response, err := client.State.SubmitPayForBlob(context.Background(), namespa
ceID, payLoad, fee, gasLimit)
        if err != nil {
                log.Fatalf("Error submitting pay for blob: %v", err)
        }
        fmt.Printf("Got output: %v", response)
        height := uint64(response.Height)
        fmt.Printf("Height that data was submitted at: %v", height)
        return height
}
```

在函数 `postDataAndGetHeight` 中，我们展示了如何向 Celestia 的特定`namespace ID` 提交消息。在成功提交后，该函数会返回提交时所在的区块高度。

接下来，实现以下函数：

```go
func getDataAsPrompt(client *client.Client, height uint64, namespaceID namespace.ID)
 string {
        headerParam := getHeader(client, height)
        response, err := client.Share.GetSharesByNamespace(context.Background(), hea
derParam.DAH, namespaceID)
        if err != nil {
                log.Fatalf("Error getting shares by namespace data for block height:
 %v. Error is %v", height, err)
        }
        var dataString string
        for _, shares := range response {
                for _, share := range shares.Shares {
                        dataString = string(share[8:])
                }
        }
        return dataString
}
```

在`getDataAsPrompt`函数中，给定一个特定的区块高度和一个`namespace ID`，它可以返回该区块的数据（在此称为 shares），然后将其转换为字符串并返回。

最后，我们实现了一个 `GPT-3.5` 的辅助函数，对给定的`prompt`进行应答。

```go
// gpt3 processes a given message using GPT-3 and prints the response.
func gpt3(msg string) {
        // Set the authentication header
        openAIKey := os.Getenv("OPENAI_KEY")
        client := openai.NewClient(openAIKey)
        resp, err := client.CreateChatCompletion(
                context.Background(),
                openai.ChatCompletionRequest{
                        Model: openai.GPT3Dot5Turbo,
                        Messages: []openai.ChatCompletionMessage{
                                {
                                        Role:    openai.ChatMessageRoleUser,
                                        Content: msg,
                                },
                        },
                },
        )

        if err != nil {
                fmt.Printf("ChatCompletion error: %v\n", err)
                return
        }
        fmt.Println(resp.Choices[0].Message.Content)
}
```

### 封装函数

现在，我们将更新我们的`main`函数，包含我们构建的函数中的逻辑，向你展示如何执行以下操作：

- 实例化`namespace ID`、`gas fee`、`gas limit`和 `GPT prompt`
- 将`GPT prompt`作为`PayForBlob`交易提交，并获得返回的区块高度
- 从该区块高度以`Data Share`的形式获取`prompt`，并将其转换为字符串并返回
- 将该字符串提交到 `gpt3` 函数，以获取输出。

```go
func main() {
        ctx, cancel := context.WithCancel(context.Background())
        defer cancel()
        loadEnv()
        var namespaceID namespace.ID = createNamespaceID()
        client := createClient(ctx)
        var gasLimit uint64 = 6000000
        fee := cosmosmath.NewInt(10000)
        var gptPrompt string = "What are modular blockchains?"
        prompt := []byte{0x00, 0x01, 0x02}
        prompt = append(prompt, []byte(gptPrompt)...)
        height := postDataAndGetHeight(client, namespaceID, prompt, fee, gasLimit)
        promptString := getDataAsPrompt(client, height, namespaceID)
        gpt3(promptString)
        // Close the client when you are finished
        client.Close()
}
```

现在，你已经拥有了游戏的最终版本！

使用以下命令运行 Golang 程序：

```sh
go run main.go
```

在一段时间后，它将会先把`prompt`发布到区块链，然后从区块链中获取到发布的`prompt`，再从 OpenAI 获取输出。

## 下一步

通过这个教程，你成功构建了一个 PFB 交易，将其提交到 Celestia，然后从 Celestia 获取并解码其内容，最后作为额外步骤，将消息提交给 GPT-3.5。

在接下来的步骤中，我们将发布针对这个教程的任务，用户需要完成这些挑战，帮助他们熟悉 Celestia 的数据可用性层。
