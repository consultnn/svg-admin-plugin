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

		> * {
			opacity: 0.5;
			pointer-events: none;
		}

		> g:not([data-element-type]) {
			pointer-events: auto;
			transition: opacity 0.3s ease;

			&:hover {
				opacity: 1;
			}
		}
	}
`;

export default class Preview extends Component {
	constructor(props) {
		super(props);

		this.containerRef = React.createRef();

		this.state = {
			isLoading: true,
			content: null
		}
	}

	componentDidMount() {
		this._getFileContent();
	}

	async _getFileContent() {
		this.setState({
			isLoading: true
		});

		await fetch('/fs/read?path=' + this.props.path)
			.then(response => response.text())
			.then(result => {
				this.setState({
					isLoading: false,
					content: result
				})
			});
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

		return <PreviewContainer ref={this.containerRef} dangerouslySetInnerHTML={createMarkup()}></PreviewContainer>;
	}
}