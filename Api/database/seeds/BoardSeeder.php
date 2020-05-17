<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('boards')->insert([
            'category_id' => 1,
            'title' => 'General Discussion',
            'description' => 'This is the place to be.',
            'position' => 1
        ]);
    }
}
