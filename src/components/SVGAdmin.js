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
	render() {
		return (
			<Container>
				<SelectButton />
				<FilesExplorerContainer />
			</Container>
		);
	}
}
