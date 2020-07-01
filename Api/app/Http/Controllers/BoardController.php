<?php

namespace App\Http\Controllers;

use App\Board;
use App\Category;
use App\Http\Resources\BoardResource;
use App\Http\Resources\TopicResource;
use App\Post;
use App\Topic;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BoardController extends Controller
{
    public function __construct()
    {
        $this->middleware('checkPermission:manage_boards', ['except' => ['index', 'show', 'topics']]);
    }

    public function index()
    {
        return BoardResource::collection(Board::all());
    }

    public function store(Request $request, ?Post $lastMessage)
    {
        $category = Category::findOrFail($request->category_id);

        return new BoardResource(Board::create([
            'category_id' => $category->id,
            'title' => $request->title,
            'description' => $request->description,
            'position' => $request->position,
            'last_message_id' => $lastMessage->id
        ]));
    }

    public function show(Board $board)
    {
        return new BoardResource($board);
    }

    public function update(Request $request, Board $board)
    {
        $board->update($request->only([
            'category_id', 'title', 'description', 'last_message_id', 'position'
        ]));
    }

    public function destroy(Board $board)
    {
        $board->delete();

        return response()->json(null, 204);
    }

    public function topics(Board $board): AnonymousResourceCollection
    {
        return TopicResource::collection(Topic::where('board_id', $board->id)->get());
    }
}
