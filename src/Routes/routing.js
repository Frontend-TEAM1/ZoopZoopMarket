import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../Pages/Landing';
import ChattingPage from '../Pages/Chat';
import FormPage from '../Pages/Form';
import MainPage from '../Pages/Main';
import MarketPricePage from '../Pages/MarketPrice';
import MyPage from '../Pages/MyPage';
import AccountBookPage from '../Pages/MyPage/MyAccountBook';
import MyInterestPage from '../Pages/MyPage/MyInterest';
import MyItemPage from '../Pages/MyPage/MyItem/Desktop/myItem';
import SearchListPage from '../Pages/SearchList';
import LayOut from '../Components/Layout';
import ErrorPage from '../Error';
import LoginPage from 'Pages/Form/Login/Desktop/LoginPage';
import SignUpPage from 'Pages/Form/SignUp/Desktop/SignUpPage';
import ItemDetailPage from 'Pages/ItemDetail';
import RegisterPage from 'Pages/Register/Desktop';
import MobileLandingPage from 'Pages/Landing/Mobile';
import MobileChattingPage from 'Pages/Chat/Mobile/MobileChattingPage';
import MobileChatDetail from 'Pages/Chat/Mobile/MobileChatDetail';

const router = createBrowserRouter([
	{
		path: '',
		element: <LandingPage />,
	},
	{
		path: 'm-landing',
		element: <MobileLandingPage />,
	},
	{
		path: 'm-chat/:id',
		element: <MobileChatDetail />,
	},
	{
		path: 'form/login',
		element: <LoginPage />,
	},
	{
		path: 'form/signup',
		element: <SignUpPage />,
	},
	{
		element: <LayOut />,
		children: [
			{
				path: 'chat',
				element: <ChattingPage />,
			},
			{
				path: 'm-chat',
				element: <MobileChattingPage />,
			},
			{
				path: 'form',
				element: <FormPage />,
			},
			{
				path: 'item_detail',
				element: <ItemDetailPage />,
			},
			{
				path: 'landing',
				element: <LandingPage />,
			},
			{
				path: 'main',
				element: <MainPage />,
			},
			{
				path: 'market_price',
				element: <MarketPricePage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
			{
				path: 'mypage/account_book',
				element: <AccountBookPage />,
			},
			{
				path: 'mypage/interest',
				element: <MyInterestPage />,
			},
			{
				path: 'mypage/item',
				element: <MyItemPage />,
			},
			{
				path: 'mypage/user_edit',
				element: <MyPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'search_list',
				element: <SearchListPage />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
