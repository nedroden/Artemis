<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->insert([
            'title' => 'Administrator',
            'color' => 'c91414',
            'permission_set_id' => 1
        ]);

        DB::table('groups')->insert([
            'title' => 'Supermod',
            'color' => '41c914',
            'permission_set_id' => 2
        ]);

        DB::table('groups')->insert([
            'title' => 'Regular member',
            'permission_set_id' => 3
        ]);

        DB::table('groups')->insert([
            'title' => 'Guest',
            'permission_set_id' => 4
        ]);
    }
}
