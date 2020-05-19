<?php

namespace Tests\Feature\Controllers\AuthController;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use DatabaseMigrations;

    public function testCreateUserWithValidInfo()
    {
        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'valid@email.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }

    public function testCreateUserWithPasswordMismatch()
    {
        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'valid@email.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpasswort'
        ]);

        $response->assertStatus(400);
    }

    public function testCreateUserWithInvalidEmail()
    {
        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'invalid-email',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['email']]);
    }

    public function testCreateDuplicateUser()
    {
        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'valid@mail.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);
        $response->assertStatus(201);

        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'another@mail.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['name']]);
    }

    public function testCreateDuplicateUserEmail()
    {
        $response = $this->post('/api/register', [
            'name' => 'my_username',
            'email' => 'valid@mail.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);
        $response->assertStatus(201);

        $response = $this->post('/api/register', [
            'name' => 'another_username',
            'email' => 'valid@mail.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['email']]);
    }

    public function testCreateUserWithLongUsername()
    {
        $response = $this->post('/api/register', [
            'name' => 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
            'email' => 'valid@email.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['name']]);
    }

    public function testCreateUserWithShortUsername()
    {
        $response = $this->post('/api/register', [
            'name' => 'ab',
            'email' => 'valid@email.com',
            'password' => 'whatacoolpassword',
            'password_confirmation' => 'whatacoolpassword'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['name']]);
    }

    public function testCreateUserWithLongPassword()
    {
        $response = $this->post('/api/register', [
            'name' => 'username',
            'email' => 'valid@email.com',
            'password' => str_repeat('a', 256),
            'password_confirmation' => str_repeat('a', 256)
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['password']]);
    }

    public function testCreateUserWithShortPassword()
    {
        $response = $this->post('/api/register', [
            'name' => 'username',
            'email' => 'valid@email.com',
            'password' => 'abcd',
            'password_confirmation' => 'abcd'
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure(['errors' => ['password']]);
    }
}
