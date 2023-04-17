<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;


class Booking extends Model
{
    protected $table = 'bookings';
    protected $fillable = ['from', 'to'];

    public function bookable()
    {
        return $this->belongsTo(Bookable::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('from', '>=', $from)->where('to', '<=', $to);
    }
    public function review()
    {
        return $this->hasOne(Review::class);
    }
}
