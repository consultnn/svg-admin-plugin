import { Component } from 'preact';
import Icon from '../controls/Icon';
import FilesList from './FilesList';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	background-color: white;
	box-shadow: 0 6px 18px 0 rgba(14,21,47,.13), 0 -2px 6px rgba(14,21,47,.03);
	border-radius: 8px;
	z-index: 1000;
`;

const HeaderButton = styled.button`
	display: inline-flex;
	background-color: transparent;
	cursor: pointer;
	border: none;
	padding: 12px;
	opacity: 0.8;
	align-items: center;
	height: 44px;

	&:focus {
		outline: none;
	}

	&:hover {
		opacity: 1;
	}

	img {
		height: 18px;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const HeaderTitle = styled.div`
	font-weight: bold;
	font-size: 18px;
	padding: 8px 12px;
	flex: 1;
	user-select: none;
`;

export default class FilesExplorerContainer extends Component {
	constructor() {
		super();
	}

	render(props) {
		return <Container>
			<Header>
				<HeaderButton title="Вернуться назад"><Icon i="back" /></HeaderButton>
				<HeaderButton title="Обновить список"><Icon i="refresh" /></HeaderButton>
				<HeaderTitle>Выберите файл</HeaderTitle>
				<HeaderButton title="Закрыть"><Icon i="close" /></HeaderButton>
			</Header>
			<FilesList />
		</Container>;
	}
}