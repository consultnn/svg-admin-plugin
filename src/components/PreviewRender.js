import React, { Component } from 'react';
import styled from 'styled-components';
import Loading from './Loading';

const PreviewContainer = styled.div`
	width: 100% !important;
	height: auto !important;

	svg {
		width: 100% !important;
		height: 100% !important;
		display: block;
		margin: 0 auto 15px auto;
	}
`;

export default class PreviewRender extends Component {
	constructor(props) {
		super(props);

		this.containerRef = React.createRef();

		this.state = {
			isLoading: true,
			content: null
		}
	}

	componentDidMount() {
		this._domain = document.getElementById('svg-admin-list').dataset.appDomain || 'ru';
		this._getFileContent();
	}

	async _getFileContent() {
		this.setState({
			isLoading: true
		});

		let flatInfo = this.props.path.split('#');

		let url = `https://svgcloud.${this._domain}/render?path=${flatInfo[0]}`;
		if (flatInfo.length > 1) {
			url += "&flat=" + flatInfo[1];
		}

		await fetch(url)
			.then(response => response.text())
			.then(result => {
				this.setState({
					isLoading: false,
					content: result
				})
			});
	}

	onPreviewClick(e) {
		const groupName = e.target.closest('svg > g');

		if (groupName && groupName.id) {
			this.props.onPreviewClick(groupName.id);
		}
	}

	render() {
		if (this.state.isLoading) {
			return <Loading />;
		}

		const createMarkup = () => {
			return {
				__html: this.state.content
			};
		};

		return <PreviewContainer ref={this.containerRef} dangerouslySetInnerHTML={createMarkup()} onClick={this.onPreviewClick}></PreviewContainer>;
	}
}