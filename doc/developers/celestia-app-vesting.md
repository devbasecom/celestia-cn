# 如何使用 Celestia App 创建锁仓账户<!--create a vesting account-->

在本指南中，我们将学习如何使用 celestia-app 在本地开发网络和 Mocha 测试网络上创建锁仓账户。

**注意**：本教程中的指令是用于创建**连续锁仓账户**（continuous vesting account）的，如果您想创建**延迟锁仓账户**（delayed vesting account），只需在锁仓交易中添加 --delayed 参数。

## 本地开发网络

首先，下载并安装 [Celestia App](https://docs.celestia.org/nodes/celestia-app/)，并选择您想要使用的[网络和相应的版本](https://docs.celestia.org/nodes/participate/)。

### 设置本地开发网络

#### 运行本地开发网络<!--Run the devnet-->

进入 celestia-app 目录（`$HOME/celestia-app`），并运行单节点的开发网络

```
cd $HOME/celestia-app
./scripts/build-run-single-node.sh
```



> 译者注释：这个脚本将自动构建并运行单节点的开发网络。该网络是一个本地模拟的区块链网络环境，仅在您的计算机上运行，不需要连接到真实的区块链网络。它可以用于开发和测试 Celestia App 中的功能，包括创建钱包、执行交易、部署智能合约等。
>
> 运行单节点开发网络后，您可以使用 Celestia App 进行交互，并尝试在本地环境中开发和测试区块链应用程序。请注意，本地开发网络是一个隔离的环境，不会影响真实的区块链网络或其他开发者的工作。
>
> 在完成开发和测试后，您可以根据需要停止本地开发网络，并将您的应用程序部署到真实的区块链网络上。



####  保存 home 目录路径

在运行单节点开发网络脚本时，您会在输出中看到一个"Home directory"的路径，这个路径将是每次运行时都是唯一的：

```
./scripts/build-run-single-node.sh
Home directory: /var/folders/_8/ljj6hspn0kn09qf9fy8kdyh40000gn/T/celestia_app_XXXXXXXXXXXXX.XV92a3qx
--> Updating go.mod
```

将路径设置为环境变量`CElESTIA_APP_HOME` ，并在接下来的开发网络部分中使用它:
```
export CElESTIA_APP_HOME=/var/folders/_8/ljj6hspn0kn09qf9fy8kdyh40000gn/T/celestia_app_XXXXXXXXXXXXX.XV92a3qx
```

**注意**：这并不会替代 `celestia-appd` 安装时所生成的二进制文件，而是在 `$HOME/celestia-app/build` 目录下构建和运行一个新的 `celestia-appd` 实例

#### 检查本地开发网络的版本

如果您想检查本地开发网络的版本，可以执行以下步骤：

```
cd $HOME/celestia-app/build
./celestia-appd version
```

#### 接下来

恭喜！您现在在本地计算机上成功运行了一个私有开发网络（devnet）。这个开发网络由一个验证者（validator）组成，负责创建新的区块。这就是 Celestia 在您的计算机上的共识网络！用于运行验证者的密钥也保存在开发网络的临时目录中。

现在，您已经准备好在 devnet 上测试创建一个锁仓账户，在前往 Mocha 真实的测试网络之前进行测试。

### 为本地开发网络设置一个锁仓账户

此时，您已经设置了一个密钥，但是为了创建一个锁仓账户，您还需要一个额外的密钥。

#### 创建新的密钥

首先，创建一个用于锁仓账户的新密钥：

```
cd $HOME/celestia-app/build
./celestia-appd keys add vesting-key --home $CElESTIA_APP_HOME
```

在输出中，您将看到有关您的密钥的地址、助记词以及更多详细信息：

```
- address: celestia127fpaygehlsgjdknwvlr2mux7h5uvhkxktgkc5
  name: vesting-key
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A5JF/we+s5gFt6g944XbKVVYgQB9OY+U/l5dhZjLDczO"}'
  type: local


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

index enter egg broken ostrich duty bitter blind all car hollow coral youth early verify point void anger daring sausage decline net shove oil
```

#### 查看所有密钥列表

```
./celestia-appd keys list --home $CElESTIA_APP_HOME
```

以下是输出：

```
- address: celestia1adgkqcmzuxvg7x5avx8a8rjwpmxgzex3ztef6j
  name: validator
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Ahzu6yr9XMPIxLquhgBhj9xL3wIaOz6PE3CvML/oPQym"}'
  type: local
- address: celestia127fpaygehlsgjdknwvlr2mux7h5uvhkxktgkc5
  name: vesting-key
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A5JF/we+s5gFt6g944XbKVVYgQB9OY+U/l5dhZjLDczO"}'
  type: local
  
```

#### 设置变量

使用验证者地址作为 `FROM_ADDRESS`，将锁仓密钥作为 `TO_ADDRESS`：

```
export FROM_ADDRESS=celestia1adgkqcmzuxvg7x5avx8a8rjwpmxgzex3ztef6j
export TO_ADDRESS=celestia127fpaygehlsgjdknwvlr2mux7h5uvhkxktgkc5
```

> 译者注释：请将 <validator_address> 替换为您的验证者地址，将 <vesting_key> 替换为您的锁仓密钥。设置了这两个变量后，您可以在后续的步骤中使用它们。

#### 创建锁仓账户

要创建一个锁仓账户（本地开发网络），请按以下步骤操作：

**注意**：以下指令是用于创建连续锁仓账户的步骤。如果您想创建延迟锁仓账户，请使用 --delayed 标志。

例如，创建延迟锁仓账户的命令如下：

```
./celestia-appd tx vesting create-vesting-account $TO_ADDRESS 100000utia 1686748051 --from $FROM_ADDRESS --gas auto --fees 100000utia --chain-id private --home $CElESTIA_APP_HOME --delayed
```

或者您可以选择不使用 --delayed 标志来创建连续锁仓账户：

```
./celestia-appd tx vesting create-vesting-account $TO_ADDRESS 100000utia 1686748051 --from $FROM_ADDRESS --gas auto --fees 100000utia --chain-id private --home $CElESTIA_APP_HOME
```

在执行命令时，您将被要求选择 "Y" 以确认交易，选择 "Y" 即表示确认创建锁仓账户。

如果您希望使用 -y 标志运行命令，将会直接执行交易而无需手动输入 "y"：

```
./celestia-appd tx vesting create-vesting-account $TO_ADDRESS 100000utia 1686748051 --from $FROM_ADDRESS --gas auto --fees 100000utia --chain-id private --home $CElESTIA_APP_HOME -y
```

输出如下：

```
gas estimate: 96112
auth_info:
  fee:
    amount:
    - amount: "100000" 
      denom: utia
    gas_limit: "96112"
    granter: ""
    payer: ""
  signer_infos: []
  tip: null
body:
  extension_options: []
  memo: ""
  messages:
  - '@type': /cosmos.vesting.v1beta1.MsgCreateVestingAccount
    amount:
    - amount: "100000"
      denom: utia
    delayed: false
    end_time: "1686748051"
    from_address: celestia1adgkqcmzuxvg7x5avx8a8rjwpmxgzex3ztef6j
    to_address: celestia127fpaygehlsgjdknwvlr2mux7h5uvhkxktgkc5
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]: y
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: 6093DF76DBA90F04FF63D197FC1569F04ED3DBE64081A0BBA9BAD4E69AA570D2
```

#### 查询 devnet 中锁仓账户详情

使用以下命令查询 `TO_ADDRESS` 账户的详情，确认账户已成功创建并且按预期运作：

```
./celestia-appd query account $TO_ADDRESS --home $CElESTIA_APP_HOME
```

在以下输出中，您可以注意到锁仓账户的类型是 `ContinuousVestingAccount`，即连续锁仓账户 ：

```
'@type': /cosmos.vesting.v1beta1.ContinuousVestingAccount
base_vesting_account:
  base_account:
    account_number: "7"
    address: celestia127fpaygehlsgjdknwvlr2mux7h5uvhkxktgkc5
    pub_key: null
    sequence: "0"
  delegated_free: []
  delegated_vesting: []
  end_time: "1686748051"
  original_vesting:
  - amount: "100000"
    denom: utia
start_time: "1687908352"
```

#### 查询 devnet 中基础账户详情

```
./celestia-appd query account $FROM_ADDRESS --home $CElESTIA_APP_HOME
```

> 译者注释：在这里，基础账户（base account）和锁仓账户（vesting account）是不同的账户。它们在Celestia App中代表不同的账户类型和功能。
> 基础账户（base account）是通常的普通账户，它持有可自由转移和使用的代币。这些代币没有被锁定，可以随时进行交易。
> 锁仓账户（vesting account）是一种特殊的账户，其中的代币被锁定一段时间，随着时间的推移逐步解锁。这种账户通常用于实现代币的线性释放，以便在一定的时间间隔内释放固定数量的代币。

在以下输出中，您可以注意到账户的类型是 `BaseAccount`，即基础账户 ：

```
'@type': /cosmos.auth.v1beta1.BaseAccount
account_number: "0"
address: celestia1adgkqcmzuxvg7x5avx8a8rjwpmxgzex3ztef6j
pub_key:
  '@type': /cosmos.crypto.secp256k1.PubKey
  key: Ahzu6yr9XMPIxLquhgBhj9xL3wIaOz6PE3CvML/oPQym
sequence: "2"
```

#### 询本地devnet中的账户余额

您可以使用以下命令查询锁仓账户（vesting account）的余额：

```
./celestia-appd query bank balances $TO_ADDRESS --home $CElESTIA_APP_HOME
```

> 译者注释：请确保将 $TO_ADDRESS 替换为您创建的锁仓账户的地址。执行上述命令后，您将获得锁仓账户的余额信息，包括锁定代币的数量和解锁时间。

输出以下：

```
balances:
- amount: "100000"
  denom: utia
pagination:
  next_key: null
  total: "0"
  
```

```
./celestia-appd query bank balances $TO_ADDRESS --home $CElESTIA_APP_HOME
```

输出将显示验证者账户（validator）的剩余余额：

```
balances:
- amount: "999994999800000"
  denom: utia
pagination:
  next_key: null
  total: "0"
  
```

恭喜！到这里，您已经在本地的devnet上创建了自己的锁仓账户。接下来，您可以学习如何在Mocha Testnet上创建锁仓账户。

### Mocha

在之前的教程部分中，我们学习了如何在本地 devnet 网络上上创建一个锁仓账户。而在本部分教程中，我们将介绍如何在 [Mocha Testnet](https://docs.celestia.org/nodes/mocha-testnet/) 上设置一个共识全节点，并创建一个锁仓账户。

首先，请确保您已经按照本页面上的说明，安装了适用于 Mocha Testnet 的[最新版本的 Celestia App](https://docs.celestia.org/nodes/celestia-app/)。


#### 创建钱包

设置密钥环后端，这样您就不需要为每个命令使用 `--home` 标签：

```
celestia-appd config keyring-backend test
```

添加一个新的全节点密钥和一个锁仓账户密钥：
```
celestia-appd keys add origin && celestia-appd keys add vesting
```

列出所有密钥：

```
celestia-appd keys list
```

将您的密钥设置为变量：

```
export FROM_ADDRESS=address_of_origin_account
export TO_ADDRESS=address_of_vesting_account
```

> 译者注释：通过这些步骤，您可以更方便地在Celestia App上操作和管理多个账户。

#### 向你的账户储值

前往[水龙头（faucet）](https://docs.celestia.org/nodes/mocha-testnet/#mocha-testnet-faucet)，并为您的原始地址（origin address）提供资金。

#### 在 Mocha 上创建一个锁仓账户

您需要一个用于发送交易的 [RPC URL（允许用户与Celestia的节点进行交互）](https://docs.celestia.org/nodes/mocha-testnet/#rpc-endpoints)，然后设置您的 RPC URL：

```
export RPC_URL=https://rpc-mocha.pops.one:443
```

在此，我们需要使用一个新标记（new flag），这不同于 devnet，即 RPC URL。

> 译者注释：前文提到，我们设置了一个本地开发网络devnet（其实就是一个跑在本地的验证节点），并且使用了自己的验证者（validator）。但是，在 Mocha 上，我们不需要使用自己的验证者（validator），而是 **可以选择** 使用一个RPC URL，也即上文提到的 new flag，这点后文还会提到。

我们还需要声明链ID为 `mocha`，同时可以通过查看 `vesting` 命令的帮助菜单，了解这些标记（flag）的更多信息：

```
celestia-appd tx vesting --help
```

以下是一个设置锁仓账户的示例：

```
celestia-appd tx vesting create-vesting-account $TO_ADDRESS 100000utia 1686748051 --from $FROM_ADDRESS --gas 100000 --fees 100000utia --node $RPC_URL --chain-id mocha --delayed
```

通过运行上述命令，将会在 Mocha测试网络 上创建一个锁仓账户，并在指定的时间点解锁代币。

#### 设置共识全节点或验证者（Optional）

运行共识全节点或验证者将使您无需使用RPC。

您可以为上一部分的教程设置一个 [验证者（validator）](https://docs.celestia.org/nodes/full-consensus-node/) 或 [全节点（full node）](https://docs.celestia.org/nodes/validator-node/) 。

> 译者注释：上文不是提到，我们需要一个 RPC URL 吗？为什么这里不需要呢？注意⚠️：这里是 Optional可选的。也就是说，如果我们已经设置了共识全节点或验证者，我们就不再依赖RPC URL同Celestia 网络进行交互。

**注意**：根据您选择的同步链状态的方式，这可能需要一些时间。

#### 更改你的 client.toml 配置文件（Optional）

通过修改 `client.toml` 配置文件，你可以在其中设置一些常用的参数。例如，你可以设置 链的ID 和 节点的RPC URL，从而避免在每个命令中重复指定这些参数，从而简化你的命令行操作。

```
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Client Configuration                            ###
###############################################################################

# The network chain ID
chain-id = "mocha"
# The keyring's backend, where the keys are stored (os|file|kwallet|pass|test|memory)
keyring-backend = "test"
# CLI output format (text|json)
output = "text"
# <host>:<port> to Tendermint RPC interface for this chain
node = "tcp://rpc-mocha.pops.one:443"
# Transaction broadcasting mode (sync|async|block)
broadcast-mode = "sync"
```

**注意**：并非所有的锁仓账户都可以通过单独的消息来创建。在Celestia网络中，有一些特殊类型的锁仓账户需要[在创世时进行设置（set at genesis）]，而无法通过普通的交易消息来创建。阅读更多：[Vesting, Cosmos SDK](https://docs.cosmos.network/v0.46/modules/auth/05_vesting.html#note)

### 总结

读到这里，恭喜你完成了本教程！你已经学会了如何设置本地开发网络、在本地开发网络上创建锁仓账户，并在 Mocha Testnet 上创建锁仓账户。











