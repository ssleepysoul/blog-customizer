import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	function onChange(articleState: ArticleStateType): void {
		console.log(articleState);
		setArticleState(articleState);
	}
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChange={(articleState) => {
					onChange(articleState);
				}}
			/>
			<Article />
		</main>
	);
};
