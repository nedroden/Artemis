<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            'board_id' => $this->board_id,
            'title' => $this->title,
            'number_of_replies' => $this->getNumberOfPosts() - 1,
            'is_locked' => $this->is_locked,
            'is_sticky' => $this->is_sticky,
            'first_message' => $this->getFirstMessage(),
            'last_message' => $this->getLastMessage(),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at
        ];
    }
}
