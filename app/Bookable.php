<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    protected $table = 'bookables';
    protected $fillable = ['title', 'description'];


    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    public function availableFor($from, $to)
    {
        return 0 !== $this->bookings()->betweenDates($from, $to)->count();
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
