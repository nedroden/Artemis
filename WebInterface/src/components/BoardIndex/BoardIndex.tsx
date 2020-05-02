import React, { Component, ReactNode } from 'react';

import conditionalSpinnerRenderer from '../../helpers/ConditionalSpinnerRenderer';
import Category from '../../models/Category';
import CategoryService from '../../services/CategoryService';
import CategoryView from './Category';

interface State {
    categories: Category[];
}

class BoardIndex extends Component<{}, State> {
    private _categoryService: CategoryService;

    public constructor(props: {}) {
        super(props);

        this._categoryService = new CategoryService();

        this.state = { categories: [] };
    }

    public componentDidMount(): void {
        this.loadCategories();
    }

    private async loadCategories(): Promise<void> {
        const categories: Category[] = await this._categoryService.getAll();

        this.setState({ categories });
    }

    public render(): ReactNode {
        return (
            <div id="category">
                {conditionalSpinnerRenderer(this.state.categories.length === 0)}
                {this.state.categories.map((category: Category, key: number) => (
                    <CategoryView key={key} details={category} />
                ))}
            </div>
        );
    }
}

export default BoardIndex;
