import React, { ChangeEvent, Component, ReactElement } from 'react';

interface Props {
    label: string;
    id: string;
    value: string;
    name: string;
    type: 'text' | 'password' | 'email';
    onChange: (value: string) => void;
}

class TextInput extends Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onChange(event.target.value);
    }

    public render(): ReactElement {
        return (
            <div className="inputContainer">
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input
                    id={this.props.id}
                    name={this.props.name}
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
