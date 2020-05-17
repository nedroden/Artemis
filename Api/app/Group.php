<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ['title', 'color', 'permission_set_id'];

    public function permissionSet()
    {
        return $this->belongsTo(PermissionSet::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
