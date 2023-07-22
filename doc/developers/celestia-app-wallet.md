# 使用 Celestia App 创建钱包


在本指南中，我们将介绍如何使用 celestia-app 生成 Celestia 钱包.

## 前提条件

- 已完成[快速入门（Quick Start）](https://docs.celestia.org/nodes/quick-start/)部分学习并安装了 celestia-app

注意：在这篇教程中你不需要安装 celestia-node。

## 创建钱包

首先，创建一个应用程序的 CLI 配置文件：

`celestia-appd config keyring-backend test`

您可以任取一个自己喜欢的钱包名称。在我们的示例中，我们使用了 "validator" 作为钱包名称：

`celestia-appd keys add validator --interactive`

保输出的助记词<!--（mnemonic）-->，这是唯一可以在您丢失钱包时恢复验证者钱包的方式！

要检查你所有的钱包，可以运行：

`celestia-appd keys list`

## 向钱包地址转入资金<!-- 加密货币或代币-->

要为公共的 Celestia 地址提供资金，您可以通过 [Discord](https://discord.gg/celestiacommunity) 将以下消息发送到 #mocha-faucet 或 #arabica-faucet 频道：

`$request celestia1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

等待确认是否成功发送了代币。要检查代币是否已成功到达目标钱包，请运行以下命令，并将公共地址替换为您自己的地址：

```
celestia-appd start
celestia-appd query bank balances celestia1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**提示**
请参考[端口](https://docs.celestia.org/nodes/celestia-node/#ports)部分，了解您的机器上需要打开哪些端口。



