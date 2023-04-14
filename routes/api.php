<?php

use App\Bookable;
use App\Http\Controllers\Api\BookableController;
use Illuminate\Http\Request;

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
// Route::get('bookables', [BookableController::class, 'index']);

// Route::get('bookables/{id}/{optional?}', function (Request $request, $id, $optional = null) {
// Route::get('bookables/{id}', [, 'show']);


Route::apiResource('bookables', 'Api\BookableController');
