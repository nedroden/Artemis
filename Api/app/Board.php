<?php

namespace App;

use App\Http\Resources\PostResource;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = ['category_id', 'title', 'description', 'last_message_id', 'position'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function getLastMessage()
    {
        return new PostResource(Post::find($this->last_message_id ?? 0));
    }

    public function getNumberOfPosts(): int
    {
        return array_sum(array_map(fn (Topic $topic) => $topic->getNumberOfPosts(), $this->topics->all()));
    }

    public function getNumberOfTopics(): int
    {
        return $this->topics()->count();
    }
}
