<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['title', 'description', 'position'];

    public function boards()
    {
        return $this->hasMany(Board::class);
    }
}
