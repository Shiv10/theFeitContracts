console.clear();
require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
	Hbar,
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main () {
    const contractBytecode = fs.readFileSync("thefeit_sol_TheFeit.bin");

    const fileCreateTx = new FileCreateTransaction()
		.setContents(contractBytecode)
		.setKeys([operatorKey])
		.freezeWith(client);
    
    const fileCreateSign = await fileCreateTx.sign(operatorKey);
    const fileCreateSubmit = await fileCreateSign.execute(client);
    const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

    const contractInstantiateTx = new ContractCreateTransaction()
		.setBytecodeFileId(bytecodeFileId)
		.setGas(100000)
	
    const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    const contractId = contractInstantiateRx.contractId;
    const contractAddress = contractId.toSolidityAddress();
    console.log(`- The smart contract ID is: ${contractId} \n`);
    console.log(`- The smart contract ID in Solidity format is: ${contractAddress} \n`);
}

main();