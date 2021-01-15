import * as React from 'react';
import {MaskInputProps} from "@idui/react-mask-input";

export interface InputStateColorsSet {
    border?: string;
    color?: string;
    background?: string;
    placeholder?: string;
    tag?: string;
}

export interface InputColors {
    default?: InputStateColorsSet;
    disabled?: InputStateColorsSet;
    error?: InputStateColorsSet;
    focused?: InputStateColorsSet;
}

export interface CommonInputProps extends MaskInputProps {
    /**
     * onChange input handler
     */
    onChange?: (value: string) => void;
     /**
     * onClear input handler
     */
     onClear?: () => void;
     /**
     * can value be empty or not
     */
     required?: boolean;
     /**
     * is input readOnly
     */
     readOnly?: boolean;
     /**
     * is input disabled
     */
     disabled?: boolean;
     /**
     * is input has error
     */
     hasError?: boolean;
     /**
     * call onChange with input value instead of whole Event. If mask provided then onlyValue would be true
     * @default true
     */
     onlyValue?: boolean;
     /**
     * whether user can clear input or not
     * @default true
     */
     isClearable?: boolean;
     /**
     * function that returns true if clear icon should be show depending on current value
     * @default (value) => Boolean(value)
     */
     isClearIconShown?: (inputValue: string) => boolean;
     /**
     * placement of clear icon
     * @default 'right'
     */
     clearIconPlacement?: 'right' | 'left';
     /**
     * input mask. If specified you can provide other props from @idui/react-mask-input
     */
     mask?: string;
     /**
     * element, embedded to the left side of TextInput
     */
     leftAddon?: React.ReactNode;
     /**
     * element, embedded to the right side of TextInput
     */
     rightAddon?: React.ReactNode;
     /**
     * input container className
     */
     className?: string;
     /**
     * elements, inserted right before rightAddon
     */
     children?: React.ReactNode;
     /**
     * colors theme for different input states
     */
     colors?: InputColors;
     /**
     * max value length
     */
     maxlength?: number;
     /**
     * input name
     */
     name?: string;
     /**
     * input placeholder
     */
     placeholder?: string;
     /**
     * input tabIndex
     */
     tabIndex?: number;
     /**
     * whether enable autocompletion or not
     */
     autoComplete?: boolean;
     /**
     * whether set focus on init or not
     */
     autoFocus?: boolean;
}

export interface TextInputProps extends CommonInputProps {
     /**
     * input value
     */
     value?: string;
     /**
     * input type
     * @default 'text'
     */
     type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'date' | 'time' | 'datetime' | 'datetime-local' | 'month' | 'week' | 'color';
}

export class TextInput extends React.Component<TextInputProps> {}


export interface NumberInputProps extends CommonInputProps {
     /**
     * input value
     */
     value?: number;
     /**
     * separator inserted between thousands in displayed value
     * @default ' '
     */
     thousandsSeparator?: string;
     /**
     * count of digits shown in integral part of displayed value if value has an integral part
     */
     countOfDigitsAfterPoint?: number;
     /**
     * maximum input value
     */
     max?: number;
     /**
     * minimum input value
     */
     min?: number;
}

export class NumberInput extends React.Component<NumberInputProps> {}


export interface SearchInputProps extends CommonInputProps {
     /**
     * input value
     */
     value?: string;
     /**
     * time interval during which onChange called only once
     * @default 300
     */
     searchTimeout?: number;
     /**
     * whether show search icon or not
     * @default true
     */
     showSearchIcon?: boolean;
     /**
     * placement of search icon
     * @default 'left'
     */
     searchIconPlacement?: 'right' | 'left';
}

export class SearchInput extends React.Component<SearchInputProps> {}


export interface TagInputProps extends CommonInputProps {
    /**
     * onChange TagInput handler
     */
    onChange?: (value: string[]) => void;
     /**
     * input type
     * @default 'text'
     */
     type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'time' | 'datetime' | 'datetime-local' | 'month' | 'week' | 'color';
     /**
     * TagInput value (array of tags)
     * @default []
     */
     value?: string[];
}

export class TagInput extends React.Component<TagInputProps> {}