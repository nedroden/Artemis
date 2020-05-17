<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');

Route::apiResource('categories', 'CategoryController');
Route::get('categories/{category}/boards', 'CategoryController@boards');

Route::apiResource('boards', 'BoardController');
Route::apiResource('groups', 'GroupController');
Route::apiResource('logentries', 'LogEntryController');
Route::apiResource('logentrytypes', 'LogEntryTypeController');
Route::apiResource('permissionsets', 'PermissionSetController');
Route::apiResource('posts', 'PostController');
Route::apiResource('topics', 'TopicController');
Route::apiResource('users', 'UserController');
