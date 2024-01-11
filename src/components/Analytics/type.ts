export interface ILMQuery {
	totalDataChart: any[];
	totalDataChartBreakdown: any[];
	protocols: Protocol[];
	allChains: string[];
	chain: any;
	total24h: number;
	total48hto24h: any;
	total7d: number;
	total14dto7d: number;
	total60dto30d: number;
	total30d: number;
	total1y: number;
	average1y: number;
	change_1d: number;
	change_7d: number;
	change_1m: number;
	totalVolume7d: number;
	totalVolume30d: number;
	change_7dover7d: number;
	change_30dover30d: number;
	breakdown24h: any;
}

export interface Protocol {
	defillamaId: string;
	name: string;
	disabled: boolean;
	displayName: string;
	module: string;
	category: string;
	logo: string;
	change_1d?: number;
	change_7d?: number;
	change_1m?: number;
	change_7dover7d?: number;
	change_30dover30d?: number;
	total24h?: number;
	total48hto24h?: number;
	total7d?: number;
	total30d?: number;
	total14dto7d?: number;
	total60dto30d?: number;
	total1y?: number;
	average1y?: number;
	totalAllTime?: number;
	breakdown24h?: Breakdown24h;
	chains: string[];
	protocolType: string;
	methodologyURL: string;
	methodology: any;
	latestFetchIsOk: boolean;
	versionKey?: string;
	dailyVolume?: number;
	totalVolume7d?: number;
	totalVolume30d?: number;
	parentProtocol?: string;
}

export interface Breakdown24h {
	ethereum?: Ethereum;
	optimism?: Optimism;
	arbitrum?: Arbitrum;
	polygon?: Polygon;
	celo?: Celo;
	bsc?: Bsc;
	avax?: Avax;
	base?: Base;
	era?: Era;
	polygon_zkevm?: PolygonZkevm;
	linea?: Linea;
	aptos?: Aptos;
	mantle?: Mantle;
	zilliqa?: Zilliqa;
	zksync?: Zksync;
	scroll?: Scroll;
	fantom?: Fantom;
	godwoken?: Godwoken;
	godwoken_v1?: GodwokenV1;
	xdc?: Xdc;
	elrond?: Elrond;
	cardano?: Cardano;
	wemix?: Wemix;
	velas?: Velas;
	wan?: Wan;
	aurora?: Aurora;
	metis?: Metis;
	kava?: Kava;
	cronos?: Cronos;
	meter?: Meter;
	fuse?: Fuse;
	vechain?: Vechain;
	smartbch?: Smartbch;
	canto?: Canto;
	near?: Near;
	vision?: Vision;
	bittorrent?: Bittorrent;
	tron?: Tron;
	ontology_evm?: OntologyEvm;
	harmony?: Harmony;
	icon?: Icon;
	iotex?: Iotex;
	ultron?: Ultron;
	sui?: Sui;
	thundercore?: Thundercore;
	algorand?: Algorand;
	thorchain?: Thorchain;
	oas?: Oas;
	shimmer_evm?: ShimmerEvm;
	solana?: Solana;
	xdai?: Xdai;
	conflux?: Conflux;
	arbitrum_nova?: ArbitrumNova;
	boba?: Boba;
	step?: Step;
	moonbeam?: Moonbeam;
	stellar?: Stellar;
	eon?: Eon;
	tezos?: Tezos;
	bitgert?: Bitgert;
	ergo?: Ergo;
	callisto?: Callisto;
	moonriver?: Moonriver;
	starknet?: Starknet;
	sx?: Sx;
	hedera?: Hedera;
	pulse?: Pulse;
	rpg?: Rpg;
	sora?: Sora;
	enuls?: Enuls;
	rollux?: Rollux;
	syscoin?: Syscoin;
	eos?: Eos;
	klaytn?: Klaytn;
	obyte?: Obyte;
	osmosis?: Osmosis;
	orai?: Orai;
	kcc?: Kcc;
	okexchain?: Okexchain;
	eos_evm?: EosEvm;
	milkomeda?: Milkomeda;
	onus?: Onus;
	ton?: Ton;
	heco?: Heco;
	tomochain?: Tomochain;
	tombchain?: Tombchain;
	mode?: Mode;
	ronin?: Ronin;
	KARURA?: Karura;
	kardia?: Kardia;
	jbc?: Jbc;
	manta?: Manta;
	flow?: Flow;
	icp?: Icp;
	hydradx?: Hydradx;
	hydra?: Hydra;
	map?: Map;
	injective?: Injective;
	elastos?: Elastos;
	functionx?: Functionx;
	evmos?: Evmos;
	neo?: Neo;
	energi?: Energi;
	lightlink_phoenix?: LightlinkPhoenix;
	persistence?: Persistence;
	carbon?: Carbon;
	radixdlt?: Radixdlt;
	defichain?: Defichain;
	wax?: Wax;
	concordium?: Concordium;
	fusion?: Fusion;
	energyweb?: Energyweb;
	meer?: Meer;
	bitcoin?: Bitcoin;
	terra2?: Terra2;
	neutron?: Neutron;
	telos?: Telos;
	stacks?: Stacks;
	acala?: Acala;
	op_bnb?: OpBnb;
}

export interface Ethereum {
	v3?: number;
	v2?: number;
	v1?: number;
	'yoshi-exchange'?: number;
	'wombat-exchange'?: number;
	wardenswap?: number;
	wagmi?: number;
	verse?: number;
	unifi?: number;
	tokenlon?: number;
	'templedao-trade'?: number;
	tegro?: number;
	swapr?: number;
	classic?: number;
	solidlydex?: number;
	'solidly-v3'?: number;
	shibaswap?: number;
	'saddle-finance'?: number;
	'primex-finance'?: number;
	openleverage?: number;
	native?: number;
	mooniswap?: number;
	maverick?: number;
	luaswap?: number;
	elastic?: number;
	integral?: number;
	hashflow?: number;
	'frax-swap'?: number;
	elk?: number;
	dodo?: number;
	'dfx-finance'?: number;
	defiplaza?: number;
	'defi-swap'?: number;
	curve?: number;
	clipper?: number;
	bxh?: number;
	brine?: number;
	'v2.1'?: number;
	apeswap?: number;
	ambient?: number;
	'allbridge-classic'?: number;
	airswap?: number;
	SmarDex?: number;
}

export interface Optimism {
	v3?: number;
	zipswap?: number;
	woofi?: number;
	'wombat-exchange'?: number;
	wardenswap?: number;
	'velodrome-v2'?: number;
	velodrome?: number;
	swapline?: number;
	trident?: number;
	rubicon?: number;
	'opx-finance'?: number;
	'mummy-finance'?: number;
	elastic?: number;
	classic?: number;
	hashflow?: number;
	elk?: number;
	dodo?: number;
	curve?: number;
	clipper?: number;
	'beethoven-x'?: number;
}

export interface Arbitrum {
	v3?: number;
	stable?: number;
	v2?: number;
	'yfx-v3'?: number;
	woofi?: number;
	'wombat-exchange'?: number;
	wardenswap?: number;
	swap?: number;
	v1?: number;
	thick?: number;
	tegro?: number;
	swapr?: number;
	swapline?: number;
	trident?: number;
	classic?: number;
	solidlizard?: number;
	'shell-protocol'?: number;
	'saddle-finance'?: number;
	ryze?: number;
	rubicon?: number;
	'ramses-exchange-v2'?: number;
	'ramses-exchange'?: number;
	'primex-finance'?: number;
	native?: number;
	'mm-finance-arbitrum'?: number;
	lighterv2?: number;
	'level-finance'?: number;
	elastic?: number;
	'joe-v2.1'?: number;
	iziswap?: number;
	integral?: number;
	hashflow?: number;
	'gmx-v2-swap'?: number;
	'frax-swap'?: number;
	elk?: number;
	e3?: number;
	dodo?: number;
	curve?: number;
	'crescent-swap'?: number;
	clipper?: number;
	'chronos-v2'?: number;
	chronos?: number;
	'camelot-v3'?: number;
	camelot?: number;
	volume?: number;
	auragi?: number;
	apeswap?: number;
	alienfi?: number;
	airswap?: number;
	SmarDex?: number;
	'3xcalibur'?: number;
}

export interface Polygon {
	v3?: number;
	woofi?: number;
	wardenswap?: number;
	unifi?: number;
	tetu?: number;
	tegro?: number;
	v2?: number;
	v1?: number;
	trident?: number;
	classic?: number;
	smartdex?: number;
	retro?: number;
	radioshack?: number;
	'primex-finance'?: number;
	polycat?: number;
	pearlfi?: number;
	native?: number;
	'mm-stableswap-polygon'?: number;
	'metavault.trade'?: number;
	metatdex?: number;
	meshswap?: number;
	elastic?: number;
	iziswap?: number;
	honeyswap?: number;
	hashflow?: number;
	'gravity-finance'?: number;
	gravis?: number;
	'frax-swap'?: number;
	empiredex?: number;
	elk?: number;
	dystopia?: number;
	dpex?: number;
	dodo?: number;
	dfyn?: number;
	'dfx-finance'?: number;
	curve?: number;
	cometh?: number;
	clipper?: number;
	auraswap?: number;
	apeswap?: number;
	'allbridge-classic'?: number;
	SmarDex?: number;
	MantisSwap?: number;
}

export interface Celo {
	v3?: number;
	ubeswap?: number;
	classic?: number;
	'mobius-money'?: number;
	'allbridge-classic'?: number;
}

export interface Bsc {
	v3?: number;
	v2?: number;
	stableswap?: number;
	'alita-finance'?: number;
	'yoshi-exchange'?: number;
	yieldfields?: number;
	woofi?: number;
	'wombat-exchange'?: number;
	wardenswap?: number;
	unifi?: number;
	v1?: number;
	'titano-swych'?: number;
	'thena-v3'?: number;
	thena?: number;
	tegro?: number;
	trident?: number;
	classic?: number;
	sphynx?: number;
	spartan?: number;
	swap?: number;
	radioshack?: number;
	pinkswap?: number;
	pandora?: number;
	padswap?: number;
	openleverage?: number;
	nomiswap?: number;
	native?: number;
	mdex?: number;
	maverick?: number;
	'level-finance'?: number;
	leonicornswap?: number;
	kyotoswap?: number;
	elastic?: number;
	'joe-v2.1'?: number;
	jetswap?: number;
	iziswap?: number;
	hyperjump?: number;
	gravis?: number;
	'frax-swap'?: number;
	empiredex?: number;
	ellipsis?: number;
	elk?: number;
	dodo?: number;
	'dinosaur-eggs'?: number;
	'dao-swap'?: number;
	cryptoswap?: number;
	cone?: number;
	'complus-network'?: number;
	bxh?: number;
	'blue-planet'?: number;
	babyswap?: number;
	babydogeswap?: number;
	autoshark?: number;
	apeswap?: number;
	ampleswap?: number;
	'allbridge-classic'?: number;
	airswap?: number;
	SmarDex?: number;
}

export interface Avax {
	v3?: number;
	woofi?: number;
	'wombat-exchange'?: number;
	v2?: number;
	v1?: number;
	unifi?: number;
	tegro?: number;
	trident?: number;
	classic?: number;
	'subzero-zswap'?: number;
	radioshack?: number;
	'pharaoh-exchange'?: number;
	pangolin?: number;
	native?: number;
	elastic?: number;
	'joe-v2.1'?: number;
	hakuswap?: number;
	'gmx-v2-swap'?: number;
	swap?: number;
	'frax-swap'?: number;
	empiredex?: number;
	elk?: number;
	dodo?: number;
	dexalot?: number;
	curve?: number;
	'complus-network'?: number;
	canary?: number;
	'allbridge-classic'?: number;
	airswap?: number;
}

export interface Base {
	v3?: number;
	v2?: number;
	'xena-finance'?: number;
	woofi?: number;
	'wombat-exchange'?: number;
	swap?: number;
	'throne-v3'?: number;
	thick?: number;
	sobal?: number;
	maverick?: number;
	elastic?: number;
	'kokonut-swap'?: number;
	iziswap?: number;
	horizondex?: number;
	fxdx?: number;
	e3?: number;
	dodo?: number;
	'dackieswap-v2'?: number;
	dackieswap?: number;
	aerodrome?: number;
	SmarDex?: number;
	Scale?: number;
	DerpDEX?: number;
}

export interface Era {
	v3?: number;
	v2?: number;
	zkswap?: number;
	zkSwap_Finance?: number;
	woofi?: number;
	wagmi?: number;
	syncswap?: number;
	swap?: number;
	'mute.io'?: number;
	merlin?: number;
	maverick?: number;
	classic?: number;
	iziswap?: number;
	DerpDEX?: number;
}

export interface PolygonZkevm {
	v3?: number;
	v2?: number;
	woofi?: number;
	'kokonut-swap'?: number;
	MantisSwap?: number;
}

export interface Linea {
	v3?: number;
	v2?: number;
	xfai?: number;
	woofi?: number;
	'velocore-v2'?: number;
	lynex?: number;
	elastic?: number;
	classic?: number;
	iziswap?: number;
	horizondex?: number;
	'echodex-v3'?: number;
	dodo?: number;
	chimpexchange?: number;
}

export interface Aptos {
	v2?: number;
	thalaswap?: number;
	liquidswap?: number;
	cetus?: number;
	'aux-exchange'?: number;
}

export interface Mantle {
	'cleopatra-exchange'?: number;
	native?: number;
	swap?: number;
	iziswap?: number;
	'fusionx-v3'?: number;
	'fusionx-v2'?: number;
	butterxyz?: number;
	'agni-fi'?: number;
}

export interface Zilliqa {
	zilswap: number;
}

export interface Zksync {
	zigzag: number;
}

export interface Scroll {
	'zebra-v2'?: number;
	'zebra-v1'?: number;
	'wombat-exchange'?: number;
	v3?: number;
	luigiswap?: number;
	elastic?: number;
	classic?: number;
	iziswap?: number;
	dodo?: number;
}

export interface Fantom {
	'yoshi-exchange'?: number;
	woofi?: number;
	wingswap?: number;
	wigoswap?: number;
	wagmi?: number;
	'tomb-swap'?: number;
	thick?: number;
	swapline?: number;
	v3?: number;
	classic?: number;
	spookyswap?: number;
	spiritswap?: number;
	'spartacus-exchange'?: number;
	soulswap?: number;
	solidly?: number;
	protofi?: number;
	'paint-swap'?: number;
	'mummy-finance'?: number;
	swap?: number;
	'morpheus-swap'?: number;
	elastic?: number;
	'knightswap-finance'?: number;
	'fvm-exchange'?: number;
	'frax-swap'?: number;
	'equity-spot'?: number;
	'equalizer-exchange'?: number;
	elk?: number;
	e3?: number;
	curve?: number;
	'beethoven-x'?: number;
	'allbridge-classic'?: number;
	abcdefx?: number;
}

export interface Godwoken {
	yokaiswap: number;
}

export interface GodwokenV1 {
	yokaiswap?: number;
	'hadouken-amm'?: number;
}

export interface Xdc {
	'xswap-protocol'?: number;
	'fathom-dex'?: number;
}

export interface Elrond {
	xexchange?: number;
	dx25?: number;
	ashswap?: number;
}

export interface Cardano {
	wingriders?: number;
	spectrum?: number;
	muesliswap?: number;
	minswap?: number;
	danogo?: number;
}

export interface Wemix {
	'wemix.fi': number;
}

export interface Velas {
	'wavelength-dao': number;
}

export interface Wan {
	'wanswap-dex': number;
}

export interface Aurora {
	wannaswap?: number;
	trisolaris?: number;
	nearpad?: number;
	iziswap?: number;
	'frax-swap'?: number;
	auroraswap?: number;
	'allbridge-classic'?: number;
}

export interface Metis {
	wagmi?: number;
	'tethys-finance'?: number;
	trident?: number;
	netswap?: number;
	'maia-v3'?: number;
}

export interface Kava {
	wagmi?: number;
	'stable-amm'?: number;
	classic?: number;
	v3?: number;
	'kinetix-derivative'?: number;
	'kava-swap'?: number;
	equilibre?: number;
	abcdefx?: number;
}

export interface Cronos {
	'vvs-finance'?: number;
	swap?: number;
	ferro?: number;
}

export interface Meter {
	v2?: number;
	iziswap?: number;
}

export interface Fuse {
	voltage?: number;
	v3?: number;
	classic?: number;
}

export interface Vechain {
	vexchange: number;
}

export interface Smartbch {
	verse?: number;
	benswap?: number;
}

export interface Canto {
	'velocimeter-v2'?: number;
	'canto-dex'?: number;
}

export interface Near {
	veax?: number;
	'ref-finance'?: number;
	'orderly-network'?: number;
}

export interface Vision {
	vanswap: number;
}

export interface Bittorrent {
	unifi?: number;
	trident?: number;
	mdex?: number;
}

export interface Tron {
	unifi?: number;
	'sunswap-v2'?: number;
	sunswap?: number;
}

export interface OntologyEvm {
	unifi?: number;
	iziswap?: number;
}

export interface Harmony {
	unifi?: number;
	classic?: number;
	'frax-swap'?: number;
}

export interface Icon {
	unifi: number;
}

export interface Iotex {
	unifi: number;
}

export interface Ultron {
	ultronswap?: number;
	iziswap?: number;
}

export interface Sui {
	turbos?: number;
	'kriya-dex'?: number;
	'flowx-finance'?: number;
	'deepbook-sui'?: number;
	cetus?: number;
	'aftermath-fi-amm'?: number;
}

export interface Thundercore {
	ttswap?: number;
	v3?: number;
}

export interface Algorand {
	tinyman?: number;
	pact?: number;
	'humble-defi'?: number;
}

export interface Thorchain {
	thorswap: number;
}

export interface Oas {
	tealswap: number;
}

export interface ShimmerEvm {
	tangleswap?: number;
	swapline?: number;
	shimmersea?: number;
}

export interface Solana {
	synthetify?: number;
	sanctum?: number;
	saber?: number;
	raydium?: number;
	phoenix?: number;
	penguin?: number;
	orca?: number;
	openbook?: number;
	spot?: number;
	lifinity?: number;
	swap?: number;
	'crema-finance'?: number;
	'allbridge-classic'?: number;
}

export interface Xdai {
	swapr?: number;
	v3?: number;
	classic?: number;
	levinswap?: number;
	honeyswap?: number;
	empiredex?: number;
	elk?: number;
	curve?: number;
	v2?: number;
}

export interface Conflux {
	swappi?: number;
	'moon-swap'?: number;
}

export interface ArbitrumNova {
	v3: number;
}

export interface Boba {
	v3?: number;
	classic?: number;
	oolongswap?: number;
	'gin-finance'?: number;
	'frax-swap'?: number;
}

export interface Step {
	'step-exchange': number;
}

export interface Moonbeam {
	'stellaswap-v3'?: number;
	stellaswap?: number;
	solarflare?: number;
	padswap?: number;
	'frax-swap'?: number;
	clipper?: number;
	v3?: number;
	'stable-amm'?: number;
	classic?: number;
	'beamex-swap'?: number;
}

export interface Stellar {
	stellarx?: number;
	lumenswap?: number;
	'allbridge-classic'?: number;
}

export interface Eon {
	spookyswap?: number;
	v3?: number;
	v2?: number;
}

export interface Tezos {
	spicyswap?: number;
	quipuswap?: number;
	plenty?: number;
}

export interface Bitgert {
	sphynx: number;
}

export interface Ergo {
	spectrum: number;
}

export interface Callisto {
	'soy-finance': number;
}

export interface Moonriver {
	solarbeam?: number;
	'frax-swap'?: number;
}

export interface Starknet {
	sithswap?: number;
	myswap?: number;
	ekubo?: number;
	'10kswap'?: number;
}

export interface Sx {
	sharkswap: number;
}

export interface Hedera {
	saucerswap?: number;
	heliswap?: number;
}

export interface Pulse {
	'pulsex-v2'?: number;
	'pulsex-v1'?: number;
}

export interface Rpg {
	ponytaswap: number;
}

export interface Sora {
	polkaswap: number;
}

export interface Enuls {
	pheasantswap: number;
}

export interface Rollux {
	'pegasys-v3': number;
}

export interface Syscoin {
	pegasys: number;
}

export interface Eos {
	paycash?: number;
	defibox?: number;
}

export interface Klaytn {
	'pangea-swap'?: number;
	'kokonut-swap'?: number;
	klayswap?: number;
	claimswap?: number;
	'allbridge-classic'?: number;
}

export interface Obyte {
	oswap: number;
}

export interface Osmosis {
	osmosis: number;
}

export interface Orai {
	oraidex: number;
}

export interface Kcc {
	openleverage?: number;
	mojitoswap?: number;
	kuswap?: number;
	abcdefx?: number;
}

export interface Okexchain {
	okcswap?: number;
	cherryswap?: number;
}

export interface EosEvm {
	'noah-swap': number;
}

export interface Milkomeda {
	muesliswap: number;
}

export interface Onus {
	miaswap?: number;
	heraswap?: number;
}

export interface Ton {
	'megaton-finance': number;
}

export interface Heco {
	mdex: number;
}

export interface Tomochain {
	luaswap: number;
}

export interface Tombchain {
	'lif3-swap': number;
}

export interface Mode {
	kizuna: number;
}

export interface Ronin {
	katana: number;
}

export interface Karura {
	'karura-swap': number;
}

export interface Kardia {
	kaidex: number;
}

export interface Jbc {
	jibswap: number;
}

export interface Manta {
	iziswap?: number;
	dodo?: number;
}

export interface Flow {
	'increment-swap': number;
}

export interface Icp {
	icpswap: number;
}

export interface Hydradx {
	hydradx: number;
}

export interface Hydra {
	v3: number;
}

export interface Map {
	hiveswap: number;
}

export interface Injective {
	helix?: number;
	'astroport-v2'?: number;
}

export interface Elastos {
	'glide-finance': number;
}

export interface Functionx {
	'fx-swap': number;
}

export interface Evmos {
	forge: number;
}

export interface Neo {
	'flamingo-finance': number;
}

export interface Energi {
	energiswap: number;
}

export interface LightlinkPhoenix {
	elektrik: number;
}

export interface Persistence {
	dexter: number;
}

export interface Carbon {
	demex: number;
}

export interface Radixdlt {
	defiplaza?: number;
	'caviarnine-lsu-pool'?: number;
	orderbook?: number;
}

export interface Defichain {
	'defichain-dex': number;
}

export interface Wax {
	defibox: number;
}

export interface Concordium {
	'concordex-io': number;
}

export interface Fusion {
	'chainge-finance': number;
}

export interface Energyweb {
	carbonswap: number;
}

export interface Meer {
	candyswap: number;
}

export interface Bitcoin {
	bisq: number;
}

export interface Terra2 {
	'astroport-v2': number;
}

export interface Neutron {
	'astroport-v2': number;
}

export interface Telos {
	'archly-finance': number;
}

export interface Stacks {
	alex: number;
}

export interface Acala {
	'acala-swap': number;
}

export interface OpBnb {
	DerpDEX: number;
}
