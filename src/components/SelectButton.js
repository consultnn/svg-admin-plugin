import React, { Component } from 'react';
import Icon from './Icon';
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

export default class SelectButton extends Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		return <SelectButtonElement>
			<Icon right={10} i="svg" /> Выбрать планировку
		</SelectButtonElement>
	}
}