export const AgriCulture = ({ width, height, color }: { color?: string; width?: number; height?: number }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width || 24} height={height || 24} viewBox="0 0 24 24">
			<path
				d="M19.5 11.9702C20.43 11.9702 21.28 12.2502 22 12.7302V7.97023C22 6.87023 21.1 5.97023 20 5.97023H13.71L12.65 4.91023L13.71 3.85023C13.91 3.65023 13.91 3.34023 13.71 3.14023C13.51 2.94023 13.2 2.94023 13 3.14023L10.17 5.97023C9.97002 6.17023 9.97002 6.48023 10.17 6.68023C10.37 6.88023 10.68 6.88023 10.88 6.68023L11.94 5.62023L13 6.68023V8.97023C13 10.0702 12.1 10.9702 11 10.9702H10.46C11.41 12.0302 12 13.4302 12 14.9702C12 15.3102 11.96 15.6402 11.91 15.9702H15.05C15.3 13.7302 17.19 11.9702 19.5 11.9702Z"
				fill={color || 'currentColor'}
			/>
			<path
				d="M19.5 12.9707C17.57 12.9707 16 14.5407 16 16.4707C16 18.4007 17.57 19.9707 19.5 19.9707C21.43 19.9707 23 18.4007 23 16.4707C23 14.5407 21.43 12.9707 19.5 12.9707ZM19.5 17.9707C18.67 17.9707 18 17.3007 18 16.4707C18 15.6407 18.67 14.9707 19.5 14.9707C20.33 14.9707 21 15.6407 21 16.4707C21 17.3007 20.33 17.9707 19.5 17.9707Z"
				fill={color || 'currentColor'}
			/>
			<path
				d="M4 8.9707H9C9 7.8707 8.1 6.9707 7 6.9707H4C3.45 6.9707 3 7.4207 3 7.9707C3 8.5307 3.45 8.9707 4 8.9707Z"
				fill={color || 'currentColor'}
			/>
			<path
				d="M9.83 13.7907L9.65 13.3207L10.58 12.9707C10.12 11.9107 9.3 11.0607 8.27 10.5407L7.87 11.4307L7.41 11.2207L7.81 10.3207C7.26 10.1107 6.64 9.9707 6 9.9707C5.47 9.9707 4.96 10.0807 4.48 10.2307L4.82 11.1407L4.35 11.3207L4 10.4007C2.94 10.8607 2.09 11.6807 1.57 12.7107L2.46 13.1107L2.25 13.5707L1.35 13.1707C1.13 13.7207 1 14.3307 1 14.9707C1 15.5007 1.11 16.0107 1.26 16.4907L2.17 16.1507L2.35 16.6207L1.42 16.9707C1.88 18.0307 2.7 18.8807 3.73 19.4007L4.13 18.5107L4.59 18.7207L4.19 19.6207C4.76 19.8407 5.37 19.9707 6.01 19.9707C6.54 19.9707 7.05 19.8607 7.53 19.7107L7.18 18.8007L7.65 18.6207L8 19.5507C9.06 19.0907 9.91 18.2707 10.43 17.2407L9.54 16.8407L9.75 16.3807L10.65 16.7807C10.87 16.2107 11 15.6007 11 14.9607C11 14.4307 10.89 13.9207 10.74 13.4407L9.83 13.7907ZM7.15 17.7507C5.62 18.3807 3.86 17.6607 3.23 16.1307C2.6 14.6007 3.32 12.8407 4.85 12.2107C6.38 11.5807 8.14 12.3007 8.77 13.8307C9.41 15.3607 8.68 17.1107 7.15 17.7507Z"
				fill={color || 'currentColor'}
			/>
		</svg>
	);
};

export default AgriCulture;
