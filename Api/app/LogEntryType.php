<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogEntryType extends Model
{
    protected $fillable = ['label'];

    public function logEntries()
    {
        return $this->hasMany(LogEntry::class);
    }
}
