import { Component } from 'preact';

export default class Icon extends Component {
	constructor() {
		super();
	}

	render(props, state) {
		let url = './assets/media/' + this.props.i + '.svg';
		let styles = {};

		if (props.w) {
			styles.width = props.w;
		}

		if (props.h) {
			styles.height = props.h;
		}

		if (props.left) {
			styles.marginLeft = props.left;
		}

		if (props.right) {
			styles.marginRight = props.right;
		}

		if (props.style) {
			styles = Object.assign(styles, props.style);
		}

		return <img src={url} alt={props.alt || ''} className="m-icon" style={styles} />;
	}
}