<?php

namespace App\Http\Controllers;

use App\Board;
use App\Category;
use App\Http\Resources\BoardResource;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('checkPermission:manage_boards', ['except' => ['index', 'show', 'boards']]);
    }

    public function index()
    {
        return CategoryResource::collection(Category::has('boards', '>', 0)->get());
    }

    public function store(Request $request)
    {
        return new CategoryResource(Category::create([
            'title' => $request->title,
            'description' => $request->description,
            'position' => $request->position
        ]));
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(Request $request, Category $category)
    {
        $category->update($request->only([
            'title', 'description', 'position'
        ]));
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }

    public function boards(Category $category)
    {
        return BoardResource::collection(Board::where('category_id', $category->id)->get());
    }
}
