import { useEffect, useState } from 'react';

import { getAccountBook } from 'Hooks/Queries/get-mypage-accountBook';

import AccountBookSelector from './Components/selector';
import AccountBookDetailInfo from './Components/detailInfo';
import DetailCard from './Components/detailCard';

import dayjs from 'dayjs';

import styled from 'styled-components';

const AccountBookPage = () => {
	const [category, setCategory] = useState('seller');
	const now = dayjs();
	const [date, setDate] = useState(now);
	const [year, setYear] = useState(now.get('year'));
	const [month, setMonth] = useState(now.get('month'));
	const thisMonth = now.get('month');

	useEffect(() => {
		setDate(`${year}-${month}-01`);
	}, [month]);

	const specificMonth = new Date(year, month, 0);
	const lastDay = specificMonth.getDate();

	const res = getAccountBook({
		page: 1,
		category,
		start: `${year}-${month}-01`,
		end: `${year}-${month}-${lastDay}`,
	});

	return (
		<S.Wrapper>
			<AccountBookDetailInfo
				category={category}
				date={date}
				setDate={setDate}
				year={year}
				month={month}
				thisMonth={thisMonth}
				data={res.data}
			/>
			<AccountBookSelector
				category={category}
				setCategory={setCategory}
				year={year}
				setYear={setYear}
				month={month}
				setMonth={setMonth}
			/>
			<DetailCard
				data={res.data}
				year={year}
				month={month}
			/>
		</S.Wrapper>
	);
};

export default AccountBookPage;

const Wrapper = styled.div`
	margin: 0 auto 300px;
	width: 100%;
	height: 100%;
`;

const DetailTitle = styled.div`
	margin: 50px 0;
`;

const S = {
	Wrapper,
	DetailTitle
};
