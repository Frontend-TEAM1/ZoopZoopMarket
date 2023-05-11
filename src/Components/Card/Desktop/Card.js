import ProductApi from 'Apis/productApi';
import HeartBtn from 'Components/Buttons/HeartBtn/HeartBtn';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ItemCard = ({ index, products }) => {
	const [liked, setLiked] = useState(products.liked);
	const navigate = useNavigate();

	const onClickCard = async () => {
		console.log(index);
		navigate(`/item_detail/${index}`);
	};

	const toggleLiked = async () => {
		try {
			const response = await ProductApi.likedBtn(index);
			if (response.status === 200) {
				setLiked(prev => (prev === 1 ? 0 : 1));
				console.log('관심상품등록됨');
			}
		} catch (error) {
			console.log('에러', error);
		}
	};

	return (
		<S.Wrapper>
			<S.Container>
				<S.Heart>
					<HeartBtn active={liked === 1} onClick={toggleLiked} />
				</S.Heart>
				<div onClick={onClickCard}>
					<S.ItemImg src={products.img_url} />
					<S.ItemInfo>
						<S.ItemTitle>{products.title}</S.ItemTitle>
						<S.ItemPrice>{products.price}원</S.ItemPrice>
						{products.ProductsTags.map(tagObj => (
							<S.ItemTag key={tagObj.idx}>
								<a className="tag-link">#{tagObj.Tag.tag}</a>
							</S.ItemTag>
						))}
					</S.ItemInfo>
				</div>
			</S.Container>
		</S.Wrapper>
	);
};

export default ItemCard;

const Wrapper = styled.div`
	display: flex;
`;

const Container = styled.div`
	min-width: 200px;
	max-height: 400px;
	cursor: pointer;
	margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	border: 1px solid lightgray;
`;

const Heart = styled.div`
	position: absolute;
	width: 25px;
	height: 25px;
	top: 30px;
	left: 152px;
	z-index: 1000000;
`;

const ItemImg = styled.img`
	position: relative;
	max-width: 200px;
	width: 100%;
	height: 250px;
	object-fit: cover;
	padding: 10px;
`;

const ItemInfo = styled.div`
	padding-top: 15px;
	max-height: 150px;
	display: flex;
	flex-wrap: wrap;
\	padding: 0 15px;
`;

const ItemTitle = styled.div`
	width: 100%;
	font-size: ${({ theme }) => theme.fontSize.sm};
	margin-bottom: 10px;
`;

const ItemPrice = styled.span`
	width: 100%;
	font-size: ${({ theme }) => theme.fontSize.sm};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 15px;
`;

const ItemTag = styled.span`
	display: inline-block;
	font-size: ${({ theme }) => theme.fontSize.xs};
	margin-right: 5px;
	margin-bottom: 10px;

	a {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const S = {
	Wrapper,
	Heart,
	Container,
	ItemImg,
	ItemInfo,
	ItemTitle,
	ItemPrice,
	ItemTag,
};
