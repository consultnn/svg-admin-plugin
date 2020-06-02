import { h, Component } from 'preact';
import Button from '../controls/Button';
import SelectButton from './SelectButton';
import FilesExplorerContainer from './FilesExplorerContainer';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	width: 600px;
	font-family: PT Sans, sans-serif;
`;

export default class SVGAdmin extends Component {
	constructor() {
		super();

		this.toggleExplorerEnabled = this.toggleExplorerEnabled.bind(this);

		this.state = {
			isExplorerEnabled: false
		}
	}

	toggleExplorerEnabled(state) {
		this.setState({
			isExplorerEnabled: state
		})
	}

	render(props, state) {
		return (
			<Container>
				<SelectButton onClick={this.toggleExplorerEnabled.bind(this, true)} />
				{ state.isExplorerEnabled ? <FilesExplorerContainer onCloseClick={this.toggleExplorerEnabled.bind(this, false)} /> : null }
			</Container>
		);
	}
}
