import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

function Header() {
	const {
		userInfo: { image, name },
	} = useContext(UserContext);

	return (
		<Container>
			<Content>
				<span>TrackIt</span>
				<img data-identifier="avatar" src={image} alt={(name, "image")}></img>
			</Content>
		</Container>
	);
}

export default Header;

const Container = styled.header`
	position: fixed;
	top: 0;
	width: 100%;
	height: 70px;
	background-color: #126ba5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Content = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	span {
		font-family: "Playball";
		font-style: normal;
		font-weight: 400;
		font-size: 39px;
		color: #ffffff;
	}

	img {
		border-radius: 50%;
		width: 51px;
	}
`;
