import { Component } from 'preact';
import sc from 'styled-components';

export default class Button extends Component {
	constructor() {
		super();
	}

	render(props, state) {
		return <button className="sa-button">
			{props.children}
		</button>;
	}
}