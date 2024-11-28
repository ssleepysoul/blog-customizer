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
	const [allSelected, setAllSelected] = useState({
		...defaultArticleState,
	});

	function reset(): void {
		setAllSelected({
			...defaultArticleState,
		});

		props.onChange(defaultArticleState);
	}

	const submit = (event: SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		props.onChange({
			...allSelected,
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
							selected={allSelected.fontFamilyOption}
							options={fontFamilyOptions}
							title={'Шрифт'}
							onChange={(selected) => {
								setAllSelected((prev) => ({
									...prev,
									fontFamilyOption: selected,
								}));
							}}
						/>
						<RadioGroup
							name={'textSize'}
							options={fontSizeOptions}
							selected={allSelected.fontSizeOption}
							title={'Размер шрифта'}
							onChange={(selected) => {
								setAllSelected((prev) => ({
									...prev,
									fontSizeOption: selected,
								}));
							}}
						/>
						<Select
							selected={allSelected.fontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={(selected) => {
								setAllSelected((prev) => ({ ...prev, fontColor: selected }));
							}}
						/>
						<Separator />
						<Select
							selected={allSelected.backgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={(selected) => {
								setAllSelected((prev) => ({
									...prev,
									backgroundColor: selected,
								}));
							}}
						/>
						<Select
							selected={allSelected.contentWidth}
							options={contentWidthArr}
							title={'Ширина контента'}
							onChange={(selected) => {
								setAllSelected((prev) => ({ ...prev, contentWidth: selected }));
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
