import * as matcha from './adapters/0x';
import * as inch from './adapters/1inch';
import * as cowswap from './adapters/cowswap';
import * as firebird from './adapters/firebird';
import * as kyberswap from './adapters/kyberswap';
import * as hashflow from './adapters/hashflow';
import * as openocean from './adapters/openocean';
import * as paraswap from './adapters/paraswap';
import * as lifi from './adapters/lifi';
// import * as rango from './adapters/rango';

import * as unidex from './adapters/unidex';
import * as airswap from './adapters/airswap';
import * as odos from './adapters/odos';
import * as yieldyak from './adapters/yieldyak';
import * as llamazip from './adapters/llamazip';
import * as krystal from './adapters/krystal';

export const adapters = [
	matcha,
	inch,
	cowswap,
	kyberswap,
	lifi,
	// rango,
	airswap,
	odos,
	krystal,
	openocean,
	yieldyak,
	paraswap,
	firebird,
	hashflow,
	llamazip,
	unidex
];
export const candleDexValid = ['uniswap', 'pancakeswap', 'raydium', 'paraswap'];
export const inifiniteApprovalAllowed = [matcha.name, inch.name, cowswap.name, paraswap.name];

export const adaptersWithApiKeys = {
	[matcha.name]: true,
	[hashflow.name]: true
};
