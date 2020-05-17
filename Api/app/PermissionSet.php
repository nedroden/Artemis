<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PermissionSet extends Model
{
    protected $fillable = ['label', 'permissions'];

    public function permissions()
    {
        return explode(';', $this->permissions);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }
}
