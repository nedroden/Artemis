<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permission_sets')->insert([
            'label' => 'Administration',
            'permissions' => 'manage_boards'
        ]);

        DB::table('permission_sets')->insert([
            'label' => 'Forum moderation',
            'permissions' => '',
        ]);

        DB::table('permission_sets')->insert([
            'label' => 'Regular members',
            'permissions' => ''
        ]);

        DB::table('permission_sets')->insert([
            'label' => 'Guests',
            'permissions' => ''
        ]);
    }
}
