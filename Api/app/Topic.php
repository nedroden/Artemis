<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = ['board', 'title', 'is_locked', 'is_sticky'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
