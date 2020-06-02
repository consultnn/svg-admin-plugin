import { Component } from 'preact';
import Icon from '../controls/Icon';
import styled from 'styled-components';
import filesList from '../assets/files.json';

const Files = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px 4px;
	max-height: 600px;
	overflow-y: auto;
	overflow-y: overlay;
`;

const File = styled.button`
	display: inline-flex;
	padding: 8px 12px;
	align-items: center;
	background-color: transparent;
	border: none;
	user-select: none;

	&:nth-child(even) {
		background-color: #fafafa;
	}

	&:focus, &:hover {
		outline: none;
		background-color: #D0E8FC;
	}
`;

const FileIcon = styled.span`
	margin-right: 10px;
`;

const FileName = styled.div`
	font-size: 13px;
	color: #212121;
`;

export default class FilesList extends Component {
	render(props) {
		const directories = props.list.directories.map(directory => {
			return <File>
				<FileIcon><Icon i="folder" /></FileIcon>
				<FileName>{directory.name}</FileName>
			</File>
		});

		const files = props.list.files.map(file => {
			return <File>
				<FileIcon><Icon i="file" /></FileIcon>
				<FileName>{file.name}</FileName>
			</File>
		});

		return <Files>
			{directories}
			{files}
		</Files>
	}
}