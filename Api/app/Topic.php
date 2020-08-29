<?php

namespace App;

use App\Http\Resources\PostResource;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = ['board', 'title', 'is_locked', 'is_sticky'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function getFirstMessage()
    {
        return new PostResource($this->posts()->first());
    }

    public function getLastMessage()
    {
        return new PostResource($this->posts()->latest()->first());
    }

    public function getNumberOfPosts(): int
    {
        return $this->posts()->count();
    }
}
