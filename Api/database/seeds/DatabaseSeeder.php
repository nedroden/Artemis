<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BoardSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(GroupSeeder::class);
        $this->call(PermissionSetSeeder::class);
        $this->call(UserSeeder::class);
    }
}
