import { BigNumber, ethers } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.RPC_URL) throw ("set process.env.RPC_URL")
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {
    const block = await provider.send('eth_getBlockByNumber', [
        'latest',
        false
    ]);
    console.log(block)
    const blockarray = [
        block.parentHash,
        block.sha3Uncles,
        block.miner,
        block.stateRoot,
        block.transactionsRoot,
        block.receiptsRoot,
        block.logsBloom,
        BigNumber.from(block.difficulty).toHexString(),
        BigNumber.from(block.number).toHexString(),
        BigNumber.from(block.gasLimit).toHexString(),
        BigNumber.from(block.gasUsed).toHexString(),
        BigNumber.from(block.timestamp).toHexString(),
        block.extraData,
        block.mixHash,
        block.nonce,
        BigNumber.from(block.baseFeePerGas).toHexString(),
    ]
    console.log(blockarray)
    const calculated_blockhash = ethers.utils.keccak256(ethers.utils.RLP.encode(blockarray))
    console.log(calculated_blockhash)
    console.log(block.hash === calculated_blockhash)
}
main()
