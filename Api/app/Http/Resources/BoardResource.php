<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
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
            'category_id' => $this->category_id,
            'title' => $this->title,
            'description' => $this->description,
            'last_message' => $this->getLastMessage(),
            'position' => $this->position,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'number_of_topics' => $this->getNumberOfTopics(),
            'number_of_posts' => $this->getNumberOfPosts()
        ];
    }
}
