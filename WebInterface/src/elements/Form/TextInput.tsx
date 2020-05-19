import React, { ChangeEvent, Component, ReactElement } from 'react';

export interface TextInputProps {
    label: string;
    id: string;
    value: string;
    type: 'text' | 'password' | 'email';
    onChange: (value: string) => void;
}

class TextInput extends Component<TextInputProps> {
    public constructor(props: TextInputProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onChange(event.target.value);
    }

    public render(): ReactElement {
        return (
            <div className="input-container">
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input
                    id={this.props.id}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.handleChange}
                    className="textInput"
                />
            </div>
        );
    }
}

export default TextInput;
