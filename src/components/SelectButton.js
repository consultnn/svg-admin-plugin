import { Component } from 'preact';
import Icon from '../controls/Icon';
import styled from 'styled-components';

const SelectButtonElement = styled.button`
	display: flex;
	width: 100%;
	align-items: center;
	background-color: #fafafa;
	border: none;
	padding: 10px 20px;
	text-align: center;
	border-radius: 8px;
	justify-content: center;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.15s ease;

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: #e1e1e1;
	}
`;

const SelectButtonIcon = styled.span`
	margin-right: 10px;
`;

export default class SelectButton extends Component {
	constructor() {
		super();
	}

	render(props) {
		return <SelectButtonElement onClick={props.onClick}>
			<SelectButtonIcon><Icon i="svg" right="10" /></SelectButtonIcon>
			Выбрать планировку
		</SelectButtonElement>;
	}
}