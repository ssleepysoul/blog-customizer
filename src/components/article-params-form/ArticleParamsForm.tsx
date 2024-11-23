import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onChange: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef(null);
	const [fontFamilySelected, setFontFamilySelected] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeSelected, setFontSizeSelected] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorSelected, setFontColorSelected] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColorSelected, setBackgroundColorSelected] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [widthContentSelected, setWidthContentSelected] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	function reset(): void {
		setFontFamilySelected(defaultArticleState.fontFamilyOption);
		setFontSizeSelected(defaultArticleState.fontSizeOption);
		setFontColorSelected(defaultArticleState.fontColor);
		setBackgroundColorSelected(defaultArticleState.backgroundColor);
		setWidthContentSelected(defaultArticleState.contentWidth);

		props.onChange(defaultArticleState);
	}

	const submit = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		props.onChange({
			fontFamilyOption: fontFamilySelected,
			fontSizeOption: fontSizeSelected,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: widthContentSelected,
		} as ArticleStateType);
	};

	function toggleOpen(): void {
		setIsOpen(!isOpen);
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			event.target instanceof Node &&
			!(sidebarRef.current as HTMLElement).contains(event.target as HTMLElement)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<div ref={sidebarRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => {
						toggleOpen();
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<h1 className={styles.title}>Задайте параметры</h1>
						<Select
							selected={fontFamilySelected}
							options={fontFamilyOptions}
							title={'Шрифт'}
							onChange={(selected) => {
								setFontFamilySelected(selected);
							}}
						/>
						<RadioGroup
							name={'textSize'}
							options={fontSizeOptions}
							selected={fontSizeSelected}
							title={'Размер шрифта'}
							onChange={(selected) => {
								setFontSizeSelected(selected);
							}}
						/>
						<Select
							selected={fontColorSelected}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={(selected) => {
								setFontColorSelected(selected);
							}}
						/>
						<Separator />
						<Select
							selected={backgroundColorSelected}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={(selected) => {
								setBackgroundColorSelected(selected);
							}}
						/>
						<Select
							selected={widthContentSelected}
							options={contentWidthArr}
							title={'Ширина контента'}
							onChange={(selected) => {
								setWidthContentSelected(selected);
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									reset();
								}}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={submit}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
