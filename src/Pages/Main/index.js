import Preview from './Components/preview';

const MainPage = () => {
	return (
		<div>
			<Preview
				categoryData={1}
				userLocation={'도곡동'}
				userName={'이재훈'}
			></Preview>
		</div>
	);
};

export default MainPage;
