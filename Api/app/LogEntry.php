<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogEntry extends Model
{
    protected $fillable = ['log_entry_type_id', 'message'];

    public function type()
    {
        return $this->belongsTo(LogEntryType::class);
    }
}
