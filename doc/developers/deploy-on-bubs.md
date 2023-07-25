# 在 Bubs testnet 上部署智能合约

在本教程中，我们会在 Bubs testnet 上部署一个智能合约。

## 依赖项

- 在你的机器上安装[Foundry](https://getfoundry.sh/)
- [Node.js](https://nodejs.org/en)
- 对 Ethereum 的基本了解
- 对 Solidity 和 Node.js 的基本了解
- 从 [Bubs faucet](https://bubsfaucet.com/) 获取 Bubs ETH
- 从[Bubs testnet 页面](./bubs-testnet.md)获取 Bubs RPC URL

## 安装

首先，在`$HOME`目录创建一个新的项目文件夹并且通过 npm 进行初始化。

```sh
cd $HOME
mkdir counter-project && cd counter-project && npm init -y
```

然后，通过下列命令初始化一个 Foundry 项目

```sh
forge init counter_contract
```

## 创建智能合约

查看`counter-project/counter_contract/src/Counter.sol`。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
```

合约包含一个名为"number"的公共无符号整数变量。该合约中有两个公共函数。`setNumber`函数允许任何人为"number"变量设置新值，而`increment`函数在每次调用时将"number"的值增加`1`。

您可以在[此处](https://ethereum.org/en/developers/learning-tools/)了解更多关于 Solidity 和智能合约编程的信息。

要编译该合约，请从`$HOME/counter-project/counter_contract/`目录运行以下 forge 命令。

```sh
forge build
```

输出如下:

```sh
[⠢] Compiling...
[⠔] Compiling 21 files with 0.8.19
[⠑] Solc 0.8.19 finished in 1.24s
Compiler run successful
```

## 测试你的智能合约

打开`test/Counter.sol`文件：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

这个文件对我们在前面部分创建的合约进行单元测试。以下是测试的内容：

合约中包含一个名为"counter"的公共"Counter"类型变量。在 `setUp` 函数中，它初始化了"Counter"合约的新实例，并将"number"变量设置为 0。

合约中有两个测试函数：`testIncrement` 和 `testSetNumber`。

`testIncrement` 函数通过调用"Counter"合约的"increment"函数进行测试，并断言"Counter"合约中的"number"为 1。这验证了"increment"操作是否正确将数字增加一。

`testSetNumber` 函数更加通用化。它接受一个无符号整数参数'x'，并测试"Counter"合约的"setNumber"函数。在使用'x'调用"setNumber"函数后，它断言"Counter"合约中的"number"等于'x'。这验证了"setNumber"函数是否正确更新了"Counter"合约中的"number"。

运行下列命令运行你的测试:

```sh
forge test
```

如果测试通过的话，输出应该与以下类似：

```sh
[⠆] Compiling...
No files changed, compilation skipped

Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 28334)
[PASS] testSetNumber(uint256) (runs: 256, μ: 27709, ~: 28409)
Test result: ok. 2 passed; 0 failed; finished in 8.96ms
```

## 部署你的智能合约

### 使用 Anvil

首先，我们将在名为"anvil"的本地开发网络上测试合约。要启动本地服务器，请运行以下命令：

```sh
anvil
```

您将看到一个本地的 RPC 端口 (127.0.0.1:8545) 和用于测试的账户。

现在让我们部署合约。首先，从"anvil"设置一个私钥：

```sh
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export ANVIL_RPC_URL=http://localhost:8545

```

现在，部署合约：

```sh
forge create --rpc-url $ANVIL_RPC_URL \
--private-key $PRIVATE_KEY \
src/Counter.sol:Counter
```

### 使用 Bubs

首先，从您资金充足的以太坊钱包中设置一个私钥，并使用您选择的 RPC 设置 BUBS_RPC_URL 变量：

```sh
export BUBS_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export BUBS_RPC_URL=https://bubs.calderachain.xyz/http
```

现在我们准备将智能合约部署到 Bubs 上，我们将运行 `forge create` 命令。

```sh
forge create --rpc-url $BUBS_RPC_URL \
--private-key $BUBS_PRIVATE_KEY \
src/Counter.sol:Counter
```

如果部署成功的话输出与以下类似：

```sh
[⠆] Compiling...
No files changed, compilation skipped
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Transaction hash: 0xf1a793a793cd9fc588f5132d99008565ea361eb3535d66499575e9e1908200b2
```

一旦您部署了合约，您就可以与它进行交互了！

首先，我们将将其设置为一个变量：

```sh
export CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## 与你的合约进行交互

Foundry 使用 `cast` 作为执行以太坊 RPC 调用的命令行界面（CLI）工具。

为了向合约写入数据，我们将使用 `cast send` 命令：

```sh
cast send $CONTRACT_ADDRESS "setNumber(uint256)" 10 --rpc-url $BUBS_RPC_URL --private-key $PRIVATE_KEY
```

输出应该与以下类似：

```sh
blockHash               0x131822bef6eb59656d7e1387c19b75be667e587006710365ec5cf58030786c42
blockNumber             3
contractAddress
cumulativeGasUsed       43494
effectiveGasPrice       3767182372
gasUsed                 43494
logs                    []
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root
status                  1
transactionHash         0x8f15d6004598f0662dd673a9898dceef77be8cc28408cecc284b28d7be32307d
transactionIndex        0
type                    2
```

现在，我们可以使用 cast call 命令进行读取调用，以查看 number 变量的状态：

```sh
cast call $CONTRACT_ADDRESS "number()" --rpc-url $BUBS_RPC_URL
```

结果将会类似：

```sh
0x000000000000000000000000000000000000000000000000000000000000000a
```

使用以下方法将结果从十六进制转换为十进制值：

```sh
echo $((0x000000000000000000000000000000000000000000000000000000000000000a))
```

## 下一步

恭喜您！您已经学会了如何将智能合约部署到 Bubs 测试网络。

接下来您打算构建什么？现在，您已经可以开始学习 [GM Portal 教程](https://docs.celestia.org/developers/gm-portal-bubs/)。
