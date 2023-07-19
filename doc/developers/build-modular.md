<!--  ---
sidebar_label: Build modular
description: Advantages of building on modular blockchains like Celestia.
---  -->

# 构建模块化

“我是一名开发者，我想知道模块化区块链<!--modular blockchains -->对我的好处！”

你来对地方了。这一页将为你介绍模块化区块链的概要及其对像你这样的开发者的好处。

如果你已经了解这些内容，可以[直接跳到最后](https://docs.celestia.org/developers/build-modular/#building-on-celestia)开始构建。

## 什么是模块化区块链？

在区块链中，大致有四个核心功能：

- **执行**：处理交易并更新状态
- **结算**：确立最终状态和解决争议
- **共识**：就交易排序达成一致
- **数据可用性**：证明数据已经发布到网络

模块化区块链将区块链的核心功能进行分工，专注于其中一到两个功能，而不像单体式（monolithic）区块链那样一肩承担所有功能。你可能已经了解了 Layer 1 和 Layer 2 的概念，这就是这个想法的基本理念。

一个典型的模块化区块链的例子是 Rollup。Rollup 承载智能合约并执行交易，就像任何单体式区块链一样。但是，这些交易的数据被发送到 Layer 1 区块链来完成其余的功能。

如果你想深入了解模块化区块链，可以参考 [Learn Modular（学习模块化）](https://celestia.org/learn/)的相关资料。

## 简单部署一个区块链<!--Ease of deploying a chain标题怎么翻译好-->

模块化区块链的目标之一就是使得部署区块链就像部署智能合约一样简单。模块化区块链有几种独特的方式，可以显著降低部署新区块链的成本。

1. **无需验证者集合**：Rollup 可以在没有自己的验证者或顺序处理器的情况下进行部署。
2. **初始安全性继承**：Rollup 不需要从零开始构建所有的安全性措施。
3. **堆栈<!-- the stack-->的任何部分都可委派<!--delegated-->**：开发者可以将 Rollup 的某些功能和任务<!--"outsourcing functions" 指的是将特定功能或任务委外给外部服务提供者或专业团队来完成，而不是由开发者自己在区块链中实现。>，委派给外部服务提供者来完成，从而缩短开发时间。

总的来说，在模块化区块链架构中，开发者可以根据需要委派堆栈的任意部分，灵活地将区块链系统的各个组件或层次，委派<!--outsource/delegate我都译成委派 -->给外部提供者或专业服务。部署新的区块链将会像点击几个选项来初始化一个可以立即投入生产的 Rollup 一样简单。

## 可拓展性<!--scaling-->

当然，如果我们想支持更多用户，需要更高的扩展性。而模块化区块链使用以下创新技术可以帮助我们实现这一目标。

- [数据可用性抽样（Data Availability Sampling）](https://celestia.org/glossary/data-availability-sampling/)：使得像 Celestia 这样的模块化区块链，可以根据轻节点（Light Nodes）的数量扩展数据可用性，从而提供更大的容量来支持 Rollup。

- **欺诈和有效性证明（Fraud and Validity Proofs）**：使得 Rollup 的验证效率大大提高。节点只需要验证小型的交易有效性证明（[有效性证明](https://celestia.org/glossary/validity-proof/)）或默认假设交易是有效的（[欺诈证明](https://celestia.org/glossary/state-transition-fraud-proof/)）。这意味着 Rollup 不需要每个节点都重新执行每笔交易，大大减少了验证的负担，使得整个系统更加高效和可扩展。

![](https://celestia-cn-1259776727.cos.ap-shanghai.myqcloud.com/doc/da-and-validity-b2f114ce8f3f149f3e1ac2d616ba4200.png)

- **解耦执行和共识**：使得开发者可以定义最适合其应用规模需求的虚拟机。
- **分离应用程序**：使得多个 Rollup 区块链中可以隔离拥堵<!--isolates congestion -->。

所有这些扩展性特性的结合使得新类型的应用程序和功能成为可能，比如链上游戏、动态元数据和短暂性Rollup<!--Ephemeral rollups） --> 等。

## 可定制性

按设计，模块化区块链不会锁定任何功能集。它们促进了实验和定制。

还记得如何通过将执行与共识解耦使虚拟机可定制吗？嗯，Rollup 是执行组件。应用程序可以在自己的 Rollup 上运行，并调整虚拟机以最大化其应用程序的性能。开发者有这种灵活性，因为 Celestia 的执行逻辑不会限制 Rollup。

基本上，Rollup 可以定制以集成任何新的或现有的虚拟机堆栈。

借助现有的 Rollup 框架，开发者可以使用 EVM 或 Cosmos SDK 运行 Rollup 测试网络。在未来，可以想象 Rollup 框架支持各种虚拟机，为开发者提供更多现成的选项来构建应用程序。

一些可以对 Rollup 的虚拟机进行的定制包括定制预编译，将事务处理方式从顺序处理改为并行处理，或者添加对私有智能合约的支持。

所有这些只是冰山一角。

## 在 Celestia 上构建<!--这一部分提到3种方案 其中2种rollup方案-->

那么，您准备开始在 Celestia 上进行实验和构建了吗？以下是目前供开发者使用的一些选项。

### 智能合约<!--Smart contracts-->

[Bubs 测试网](https://bubstestnet.com/) 是一个专用的与 EVM 兼容的 Rollup，开发者可以使用它来测试和部署智能合约应用程序。

### Sovereign rollups方案

开发者可以在 Celestia 上的 Sovereign rollup 测试网上构建应用程序。[Rollkit](https://rollkit.dev/) 和 [Sovereign SDK](https://github.com/Sovereign-Labs/sovereign-sdk/tree/main/examples/demo-rollup) 允许开发者在 Celestia 上构建独立的 Rollup 测试网。

### 其他Rollups方案<!--非 Sovereign rollup -->

此外，开发者还可以使用 [Dymension’s Rollapps](https://docs.dymension.xyz/) 或 [Optimism’s OP Stack](https://docs.celestia.org/developers/optimism-devnet/) 来为他们的应用程序构建 Rollup 测试网。