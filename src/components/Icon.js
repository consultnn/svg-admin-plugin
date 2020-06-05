import React, { Component } from 'react';

export default class Icon extends Component {
	render() {
		let url = '/assets/svg-media/' + this.props.i + '.svg';
		let styles = {};

		if (this.props.w) {
			styles.width = this.props.w;
		}

		if (this.props.h) {
			styles.height = this.props.h;
		}

		if (this.props.left) {
			styles.marginLeft = this.props.left;
		}

		if (this.props.right) {
			styles.marginRight = this.props.right;
		}

		if (this.props.top) {
			styles.marginTop = this.props.top;
		}

		if (this.props.style) {
			styles = Object.assign(styles, this.props.style);
		}

		return <img src={url} alt={this.props.alt || ''} className="m-icon" style={styles} />;
	}
}