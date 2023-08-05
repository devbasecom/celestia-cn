<script setup>
    import Tabs from "../../src/components/Tabs.vue";
    </script>

# 部署 OP Stack devnet

本教程用来展示如何运行你自己的 OP Stack devnet

## 安装依赖

### 环境配置及安装 Golang

参考[这里](../nodes/environment.md)

### 克隆仓库

然后，克隆这个仓库

<script>
    const networks = ["Local Devnet", "Arabica Devnet"];
    const network0 = networks[0];
    const network1 = networks[1];
</script>

<Tabs :tabs="networks">

<template v-slot:[network0]>

```sh
cd $HOME
git clone https://github.com/celestiaorg/optimism
cd optimism
git checkout v0.1.2-OP_v1.0.6-CN_v0.11.0-rc8
```

</template>

<template v-slot:[network1]>

```sh
cd $HOME
git clone https://github.com/celestiaorg/optimism
cd optimism
git checkout v0.1.2-OP_v1.0.6-CN_v0.11.0-rc8
```

</template>

</Tabs>
