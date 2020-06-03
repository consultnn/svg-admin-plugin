import React, { Component } from 'react';
import Icon from './Icon';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	background-color: white;
	box-shadow: 0 6px 18px 0 rgba(14,21,47,.13), 0 -2px 6px rgba(14,21,47,.03);
	border-radius: 8px;
	z-index: 1000;
`;

const HeaderButton = styled.button`
	display: inline-flex;
	background-color: transparent;
	cursor: pointer;
	border: none;
	padding: 12px;
	opacity: 0.8;
	align-items: center;
	height: 44px;
	&:focus {
		outline: none;
	}
	&:hover {
		opacity: 1;
	}
	img {
		height: 18px;
	}

	&:disabled {
		cursor: default;
		opacity: 0.4;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const HeaderTitle = styled.div`
	font-weight: bold;
	font-size: 18px;
	padding: 8px 12px;
	flex: 1;
	user-select: none;
	text-align: center;
`;

const SecondaryTitle = styled.span`
	color: gray;
`;

const File = styled.button`
	display: inline-flex;
	padding: 8px 12px;
	align-items: center;
	background-color: transparent;
	border: none;
	&:nth-child(even) {
		background-color: #fafafa;
	}
	&:focus, &:hover {
		outline: none;
		background-color: #D0E8FC;
	}
`;

const FilesList = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 5px;
	max-height: 500px;
	overflow-y: auto;
`;

const EmptyFolderMessage = styled.div`
	font-size: 13px;
	color: #212121;
	text-align: center;
	padding: 100px 50px;
`;

const LoadingMessage = styled.div`
	font-size: 13px;
	color: #212121;
	text-align: center;
	padding: 100px 50px;

	svg {
		display: block;
		margin: 0 auto 15px auto;
	}
`;

export default class FileListControl extends Component {
	constructor() {
		super();

		this.onBackClick = this.onBackClick.bind(this);

		this.state = {
			currentPath: null,
			rootPath: null,
			files: [],
			isLoading: false,
			target: null,
			currentFolder: {},
			childrenFolders: []
		}
	}

	async componentDidMount() {
		const rootPath = await fetch('/fs/root').then(response => response.text());

		this.setState({
			currentPath: rootPath,
			rootPath: rootPath
		});

		this._getList(rootPath)
	}

	async _getList(path) {
		this.setState({
			isLoading: true
		});

		const promise = await fetch('/fs/list?path=' + path)
			.then(response => response.json())
			.then(result => {
				this.setState({
					isLoading: false,
					files: result.files,
					childrenFolders: result.directories,
					currentFolder: result.currentDirectory,
					currentPath: path
				})
			})
	}

	onFolderClick(newPath) {
		this.setState({
			currentState: newPath
		});

		this._getList(newPath);
	}

	onBackClick() {
		this._getList(this.state.currentFolder.parent);
	}

	render() {
		const folders = this.state.childrenFolders.map((folder, folderIndex) => {
			return <File key={folderIndex} title={folder.name} onClick={this.onFolderClick.bind(this, folder.path)}><Icon i="folder" right={10} /> {folder.name}</File>;
		});

		const files = this.state.files.map((file, fileIndex) => {
			return <File key={fileIndex} title={file.name}><Icon i="file" right={10} /> {file.name}</File>;
		});

		let emptyMessage = null;
		if (!folders.length && !files.length && !this.state.isLoading) {
			emptyMessage = <EmptyFolderMessage>Нет файлов</EmptyFolderMessage>
		}

		let loadingMessage = null;
		if (this.state.isLoading) {
			loadingMessage = <LoadingMessage>
				<svg width="64px" height="64px" viewBox="0 0 128 128"><g><path d="M64 0L40.08 21.9a10.98 10.98 0 0 0-5.05 8.75C34.37 44.85 64 60.63 64 60.63V0z" fill="#ffb118"/><path d="M128 64l-21.88-23.9a10.97 10.97 0 0 0-8.75-5.05C83.17 34.4 67.4 64 67.4 64H128z" fill="#80c141"/><path d="M63.7 69.73a110.97 110.97 0 0 1-5.04-20.54c-1.16-8.7.68-14.17.68-14.17h38.03s-4.3-.86-14.47 10.1c-3.06 3.3-19.2 24.58-19.2 24.58z" fill="#cadc28"/><path d="M64 128l23.9-21.88a10.97 10.97 0 0 0 5.05-8.75C93.6 83.17 64 67.4 64 67.4V128z" fill="#cf171f"/><path d="M58.27 63.7a110.97 110.97 0 0 1 20.54-5.04c8.7-1.16 14.17.68 14.17.68v38.03s.86-4.3-10.1-14.47c-3.3-3.06-24.58-19.2-24.58-19.2z" fill="#ec1b21"/><path d="M0 64l21.88 23.9a10.97 10.97 0 0 0 8.75 5.05C44.83 93.6 60.6 64 60.6 64H0z" fill="#018ed5"/><path d="M64.3 58.27a110.97 110.97 0 0 1 5.04 20.54c1.16 8.7-.68 14.17-.68 14.17H30.63s4.3.86 14.47-10.1c3.06-3.3 19.2-24.58 19.2-24.58z" fill="#00bbf2"/><path d="M69.73 64.34a111.02 111.02 0 0 1-20.55 5.05c-8.7 1.14-14.15-.7-14.15-.7V30.65s-.86 4.3 10.1 14.5c3.3 3.05 24.6 19.2 24.6 19.2z" fill="#f8f400"/><circle cx="64" cy="64" r="2.03"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-360 64 64" dur="2700ms" repeatCount="indefinite"></animateTransform></g></svg>

				Получение данных...
			</LoadingMessage>;
		}

		let title = 'Выберите файл';
		let secondaryTitle = null;
		if (this.state.currentFolder.path !== this.state.rootPath && this.state.currentFolder.path) {
			title = this.state.currentFolder.title;

			const pathWithoutRoot = this.state.currentFolder.path.replace(this.state.rootPath, '');
			if (pathWithoutRoot.length) {
				console.log(pathWithoutRoot);
				secondaryTitle = <SecondaryTitle>..{pathWithoutRoot.split('/').slice(0, -1).join('/')}/</SecondaryTitle>;
			}
		}

		return <Container>
			<Header>
				<HeaderButton title="Вернуться назад" onClick={this.onBackClick} disabled={this.state.currentFolder.path === this.state.rootPath}><Icon i="back" /></HeaderButton>
				<HeaderButton title="Обновить список" disabled={true}><Icon i="refresh" /></HeaderButton>
				<HeaderTitle>{secondaryTitle}{ title }</HeaderTitle>
				<HeaderButton title="Закрыть"><Icon i="close" /></HeaderButton>
			</Header>
			<FilesList>
				{ this.state.isLoading ? loadingMessage : [folders, files, emptyMessage]}
			</FilesList>
		</Container>;
	}
}