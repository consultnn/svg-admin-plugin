import React, { Component } from 'react';
import Icon from './Icon';
import styled from 'styled-components';

const SelectButtonElement = styled.div`
	display: flex;
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	border: none;
	padding: 0;
	align-items: normal;

	&:focus {
		outline: 0;
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

const FileViewButton = styled.button`
	margin: -10px -20px;
	padding: 10px 20px;
	border: none;
	background-color: #fafafa;
	border-left: 1px solid lightgray;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: #e1e1e1;
	}
`;

const SelectButtonActiveZone = styled.button`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: #fafafa;
	transition: background-color 0.15s ease;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	border: none;

	& + & {
		border-left: 1px solid lightgray;
	}

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

	onCloseButtonClick() {
		this.props.changeUrl(null);
	}

	render() {
		let buttonContent = <SelectButtonActiveZone type="button" onClick={this.props.onClick}><Icon w={20} h={20} right={10} i="svg" /> Выбрать планировку</SelectButtonActiveZone>;
		if (this.props.selected) {
			const fileUrlArray = this.props.selected.split('#');
			const fileName = [<FileUrlFileName>{fileUrlArray[0]}</FileUrlFileName>];

			if (fileUrlArray.length) {
				fileName.push(<FileUrlFlatName>{fileUrlArray[1]}</FileUrlFlatName>)
			}

			buttonContent = <React.Fragment>
				<SelectButtonActiveZone type="button" onClick={this.props.onClick}><Icon right={10} i="flat" /> {fileName}</SelectButtonActiveZone>
				<SelectButtonActiveZone type="button" title="Предпросмотр" style={{flex: 0}} onClick={this.props.setFilePreviewState}><Icon i="view" /></SelectButtonActiveZone>
				<SelectButtonActiveZone type="button" title="Отменить выбранную планировку" style={{flex: 0}} onClick={this.onCloseButtonClick.bind(this)}><Icon i="close" /></SelectButtonActiveZone>
			</React.Fragment>;
		}

		return <SelectButtonElement type="button">
			{ buttonContent }
		</SelectButtonElement>
	}
}