<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'topic_id' => $this->topic_id,
            'user' => $this->user()->first(),
            'body' => $this->body,
            'last_updated_by_id' => $this->last_updated_id,
            'ip_address' => $this->ip_address,
            'topic_title' => $this->topic->title,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at
        ];
    }
}
