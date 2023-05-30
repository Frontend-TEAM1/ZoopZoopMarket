import styled from 'styled-components';
import PropTypes from 'prop-types';
import { styled as mui } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from 'Apis/@core';
import { useRecoilValue } from 'recoil';
import { reviewAtom } from 'Atoms/review.atom';

const ReviewPage = () => {
	const StyledRating = mui(Rating)(({ theme }) => ({
		'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
			color: theme.palette.action.disabled,
		},
	}));

	const target = useRecoilValue(reviewAtom);

	const { idx } = useParams();
	const title = target.title;
	const [content, setContent] = useState('');
	const [ondo, setOndo] = useState(3);
	const [images, setImages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		// FormData 생성
		const formData = new FormData();
		formData.append('title', title); // title: string
		formData.append('content', content); // content: string
		formData.append('ondo', ondo + 33); // ondo: number

		for (let i = 0; i < images.length; i++) {
			formData.append('images', images[i]); // images: File[]
		}

		try {
			// POST 요청
			const response = await Axios.post('/api/review', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				params: {
					payList_idx: idx,
				},
			});

			console.log(response.data);
			navigate('/mypage/account_book');
		} catch (error) {
			console.error(error.response.data.message);
		}
	};

	const customIcons = {
		1: {
			icon: (
				<SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 60 }} />
			),
			label: 'Very Dissatisfied',
		},
		2: {
			icon: <SentimentDissatisfiedIcon color="error" sx={{ fontSize: 60 }} />,
			label: 'Dissatisfied',
		},
		3: {
			icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: 60 }} />,
			label: 'Neutral',
		},
		4: {
			icon: <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: 60 }} />,
			label: 'Satisfied',
		},
		5: {
			icon: (
				<SentimentVerySatisfiedIcon color="success" sx={{ fontSize: 60 }} />
			),
			label: 'Very Satisfied',
		},
	};

	function IconContainer(props) {
		const { value, ...other } = props;
		return <span {...other}>{customIcons[value].icon}</span>;
	}

	IconContainer.propTypes = {
		value: PropTypes.number.isRequired,
	};

	return (
		target && (
			<S.Wrapper>
				<S.ReviewTitle>구매한 아이템</S.ReviewTitle>
				<S.Target>
					<S.TargetImg src={target.img_url} />
					<S.TargetContent>
						<S.TargetTitle>{target.title}</S.TargetTitle>
						<S.TargetPrice>
							{target.price == 0 ? '무료나눔' : target.price}
						</S.TargetPrice>
					</S.TargetContent>
				</S.Target>
				<form onSubmit={handleSubmit}>
					<S.ReviewTitle>아이콘을 클릭하여 만족도를 입력해주세요</S.ReviewTitle>
					<span>
						왼쪽부터 '매우불만족 - 불만족 - 보통 - 만족 - 매우만족' 순입니다.
					</span>
					<S.RatingWrapper>
						<div>
							<StyledRating
								name="highlight-selected-only"
								value={ondo}
								IconContainerComponent={IconContainer}
								getLabelText={value => customIcons[value].label}
								highlightSelectedOnly
								onChange={(event, newValue) => {
									setOndo(newValue);
								}}
							/>
						</div>
					</S.RatingWrapper>

					<S.ReviewTitle>판매자 님과의 거래 후기를 남겨주세요.</S.ReviewTitle>
					<S.TxtArea
						value={content}
						onChange={event => setContent(event.target.value)}
						placeholder="본문 내용을 입력해주세요."
					></S.TxtArea>

					<input
						type="file"
						accept="image/*"
						multiple
						onChange={event => setImages(event.target.files)}
					/>
					<S.Container>
						<S.RegisterBtn type="submit">등록하기</S.RegisterBtn>
					</S.Container>
				</form>
				<S.ReviewTitle>유의사항</S.ReviewTitle>
				<li>
					구매한 아이템과 무관한 리뷰, 상대방에 대한 욕설, 비방, 명예훼손 등의
					내용을 담고 있는 경우 통보없이 삭제될 수 있습니다.
				</li>
				<li>
					회원님의 이메일, 휴대폰과 같은 개인정보 입력은 금지되어 있습니다.
				</li>
			</S.Wrapper>
		)
	);
};

export default ReviewPage;

const Wrapper = styled.div`
	width: 70%;
	min-width: 700px;
	max-width: 1200px;
	margin: 0 auto;
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	span {
		font-size: ${({ theme }) => theme.fontSize.sm};
		color: ${({ theme }) => theme.color.gray[300]};
	}
	li {
		font-size: ${({ theme }) => theme.fontSize.sm};
		color: ${({ theme }) => theme.color.gray[400]};
		margin-bottom: 10px;
	}
`;

const Target = styled.div`
	width: 100%;
	display: flex;
`;

const TargetImg = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
`;

const TargetContent = styled.div`
	width: 60%;
	padding: 10px 30px 30px 30px;
	display: flex;
	flex-direction: column;
`;

const TargetTitle = styled.div`
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 10px;
`;

const TargetPrice = styled.div`
	font-size: ${({ theme }) => theme.fontSize.sm};
`;

const ReviewTitle = styled.h2`
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bolder};
	margin-bottom: 15px;
	margin-top: 50px;
	text-align: left;
	padding: 10px;
	background-color: ${({ theme }) => theme.color.gray[100]};
`;

const RatingWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	position: relative;
	margin-bottom: 20px;

	div {
		margin-top: 40px;
		width: 100%;
	}
`;

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 10px;
	display: flex;
`;

const TxtArea = styled.textarea`
	width: 100%;
	height: 250px;
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	font-size: ${({ theme }) => theme.fontSize.sm};
	padding: 20px;

	:focus {
		outline: none;
	}
`;

const TxtAreaTitle = styled.input`
	width: 100%;
	height: 50px;
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	font-size: ${({ theme }) => theme.fontSize.sm};
	padding: 20px;
	:focus {
		outline: none;
	}
`;

const RegisterBtn = styled.button`
	width: 200px;
	height: 50px;
	border: none;
	border-radius: 5px;
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	background-color: ${({ theme }) => theme.color.subBeige};
	margin-left: auto;
	cursor: pointer;
	:hover {
		background-color: ${({ theme }) => theme.color.primary[400]};
		color: ${({ theme }) => theme.color.white};
	}
`;

const S = {
	Wrapper,
	Target,
	TargetImg,
	TargetContent,
	TargetTitle,
	TargetPrice,
	ReviewTitle,
	RatingWrapper,
	Container,
	TxtArea,
	TxtAreaTitle,
	RegisterBtn,
};
