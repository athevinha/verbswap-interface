export interface IToken {
	address: string;
	label: string;
	value: string;
	logoURI: string;
	logoURI2?: string | null;
	symbol: string;
	decimals: number;
	name: string;
	chainId: number;
	amount?: string | number;
	balanceUSD?: number;
	geckoId: string | null;
	isGeckoToken?: boolean;
}
  
export interface ITopPoolGK {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationships;
}

export interface Attributes {
	base_token_price_usd: string;
	base_token_price_native_currency: string;
	quote_token_price_usd: string;
	quote_token_price_native_currency: string;
	base_token_price_quote_token: string;
	quote_token_price_base_token: string;
	address: string;
	name: string;
	pool_created_at: any;
	token_price_usd: string;
	fdv_usd: string;
	market_cap_usd: string;
	volume_usd: {
		h1: string;
		h24: string;
	};
	reserve_in_usd: string;
}

export interface Relationships {
	base_token: {
		data: {
			id: string;
			type: string;
		};
	};
	quote_token: {
		data: {
			id: string;
			type: string;
		};
	};
	dex: {
		data: {
			id: string;
			type: string;
		};
	};
}

export interface IOHLCV {
	ts: number;
	o: number;
	h: number;
	l: number;
	c: number;
	v: number;
};