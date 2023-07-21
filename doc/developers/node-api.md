# Node API

Celestia Node API 用于与 Celestia Node 进行交互。用户和开发者可以通过两种方式与 API 进行交互：RPC API 和 Gateway API。API 的文档可以在[这里](https://node-rpc-docs.celestia.org/)找到。

## RPC API

RPC API 主要面向在 Celestia 上构建项目和开发者，他们希望运行自己的 DA（分布式账本）节点。RPC API 提供更丰富的功能和更优的用户体验。与 Gateway API 不同，RPC API 允许访问 DA 节点的内部钱包和密钥环，以及其他敏感项及管理功能。

### SDK / Library

可以使用 Golang SDK 来操作节点，设计用于以编程方式访问 API。

### RPC

RPC API 也以 OpenRPC (JSON-RPC 2.0) 的形式向用户提供，以便他们将自己的 DA 节点作为独立的 DA 服务运行。它提供了与库相同的功能，并附带一个额外的身份验证系统，具有不同的权限级别，以保护钱包和签名，同时提供 RPC 级别的 DOS（拒绝服务攻击）保护。

### RPC API 教程

使用 RPC CLI 的[节点教程](./node-tutorial.md) 是与 Celestia 节点进行交互的推荐方式。

## Gateway API

::: warning 注意 ⚠️

Gateway 接入点已经被弃用并且将在未来移除。如果您仍想使用它们，可以在[此处](https://github.com/celestiaorg/celestia-node/pull/2360)找到更多详情。
:::

Gateway API 是一个 REST API，旨在由基础设施提供商部署，为不想或无法通过 HTTP 运行轻节点（例如当前的浏览器）的外部用户启用 DA 网络的公共只读网关。其不具备钱包或签名功能。

### Gateway API 教程

使用 Gateway API 的“提示词吞噬者”教程可以在[这里](./prompt-scavenger.md)找到。
