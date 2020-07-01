import React, { Component, ReactNode } from 'react';

import conditionalSpinnerRenderer from '../../Helpers/ConditionalSpinnerRenderer';
import Category from '../../Models/Category';
import CategoryService from '../../Services/CategoryService';
import Heading from '../Elements/Heading';
import CategoryView from './Category';

interface State {
    categories: Category[];
}

type Props = {};

class BoardIndex extends Component<Props, State> {
    private _categoryService: CategoryService;

    public constructor(props: Props) {
        super(props);

        this._categoryService = new CategoryService();

        this.state = { categories: [] };
    }

    public componentDidMount(): void {
        this.loadCategories();
    }

    private async loadCategories(): Promise<void> {
        const categories: Category[] = await this._categoryService.getAll();

        this.setState({
            categories: categories.sort((a: Category, b: Category) => (a?.position || 0) - (b?.position || 0))
        });
    }

    public render(): ReactNode {
        return (
            <div>
                <Heading text="Board index" />
                {conditionalSpinnerRenderer(this.state.categories.length === 0)}
                {this.state.categories.map((category: Category, key: number) => (
                    <CategoryView key={key} details={category} />
                ))}
            </div>
        );
    }
}

export default BoardIndex;
