<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Review;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'id' => Str::uuid(),
        'content' => $faker->sentences(5, true),
        'rating' => $faker->numberBetween(1, 5)
    ];
});
