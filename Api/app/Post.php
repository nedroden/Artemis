<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['topic_id', 'user_id', 'body', 'last_updated_by_id', 'ip_address'];

    public function user()
    {
        return $this->belongsTo('user');
    }
}
