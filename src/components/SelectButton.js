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

const FileUrlFileName = styled.span`
	color: #212121;
	font-weight: 700;
	font-size: 14px;
`;

const FileUrlFlatName = styled.span`
	color: gray;
	font-weight: 500;
	font-size: 14px;
	margin-left: 10px;
`;

export default class SelectButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let buttonContent = <React.Fragment><Icon right={10} i="svg" /> Выбрать планировку</React.Fragment>;
		if (this.props.selected) {
			const fileUrlArray = this.props.selected.split('#');
			const fileName = [<FileUrlFileName>{fileUrlArray[0]}</FileUrlFileName>];

			if (fileUrlArray.length) {
				fileName.push(<FileUrlFlatName>{fileUrlArray[1]}</FileUrlFlatName>)
			}

			buttonContent = <React.Fragment><Icon right={10} i="flat" /> {fileName}</React.Fragment>;
		}

		return <SelectButtonElement onClick={this.props.onClick}>
			{ buttonContent }
		</SelectButtonElement>
	}
}